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
    return { authorized: false, error: "Unauthorized access: Only authenticated Admin users can manage block status." };
  }

  return { authorized: true, user, token };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");
    const authResult = await verifyAdminAuth(authHeader);

    if (!authResult.authorized) {
      return new Response(
        JSON.stringify({ error: authResult.error }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const bodyData = await request.json();
    const { userId, is_blocked } = bodyData;

    if (!userId || typeof is_blocked !== "boolean") {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: userId and is_blocked boolean." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prevent admin from self-blocking
    if (userId === authResult.user.id && is_blocked) {
      return new Response(
        JSON.stringify({ error: "Action Denied: You cannot block your own Admin account." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { url: supabaseUrl, anonKey } = getSupabaseConfig();

    // Update target user profile using caller's admin bearer token
    const updateRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${authResult.token}`,
          "apikey": anonKey,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          is_blocked,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      return new Response(
        JSON.stringify({ error: `Failed to update block status: ${errText}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedProfiles = await updateRes.json();
    const updatedUser = updatedProfiles?.[0];

    return new Response(
      JSON.stringify({
        success: true,
        message: `User account has been successfully ${is_blocked ? "blocked" : "unblocked"}.`,
        userId,
        is_blocked: updatedUser?.is_blocked ?? is_blocked,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to update user block status." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
