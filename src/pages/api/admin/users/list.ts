import type { APIRoute } from "astro";
import { getSupabaseConfig } from "../../../../lib/supabase";

export const prerender = false;

async function verifyAdminAuth(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authorized: false, error: "Missing authorization bearer token." };
  }

  const token = authHeader.split(" ")[1];
  const { url: supabaseUrl, anonKey } = getSupabaseConfig();

  if (!supabaseUrl || !anonKey) {
    return { authorized: false, error: "Supabase authentication is not configured on server." };
  }

  // 1. Verify User Token with Supabase Auth API
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "apikey": anonKey,
    },
  });

  if (!userRes.ok) {
    return { authorized: false, error: "Invalid or expired session token." };
  }

  const user = await userRes.json();
  if (!user || !user.id) {
    return { authorized: false, error: "User authentication failed." };
  }

  // 2. Query Profiles Table to verify Admin Role & Block Status
  const profileRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=role,is_blocked`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "apikey": anonKey,
      },
    }
  );

  if (!profileRes.ok) {
    return { authorized: false, error: "Failed to verify user profile role." };
  }

  const profiles = await profileRes.json();
  const profile = profiles?.[0];

  if (profile?.is_blocked) {
    return { authorized: false, error: "Account Blocked: Access denied." };
  }

  if (!profile || profile.role?.trim().toLowerCase() !== "admin") {
    return { authorized: false, error: "Unauthorized access: Only authenticated Admin users can access user management." };
  }

  return { authorized: true, user, token };
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");
    const authResult = await verifyAdminAuth(authHeader);

    if (!authResult.authorized) {
      return new Response(
        JSON.stringify({ error: authResult.error }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const { url: supabaseUrl, anonKey } = getSupabaseConfig();

    // Fetch all user profiles using caller's Bearer token
    const profilesRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?select=*&order=created_at.desc`,
      {
        headers: {
          "Authorization": `Bearer ${authResult.token}`,
          "apikey": anonKey,
        },
      }
    );

    if (!profilesRes.ok) {
      const errText = await profilesRes.text();
      return new Response(
        JSON.stringify({ error: `Failed to fetch users: ${errText}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const users = await profilesRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        users,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to fetch user list." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
