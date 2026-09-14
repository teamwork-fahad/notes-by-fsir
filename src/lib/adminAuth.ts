import { getSupabaseConfig } from "./supabase";

export async function verifyAdminAuth(authHeader: string | null) {
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
    return { authorized: false, error: "Unauthorized access: Admin privileges required." };
  }

  return { authorized: true, user };
}
