import type { APIRoute } from "astro";
import { getSupabaseConfig } from "../../../lib/supabase";
import { deleteFileFromGitHub, getGitHubConfig } from "../../../lib/github";

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

  const profileRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=role`,
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

  if (!profile || profile.role !== "admin") {
    return { authorized: false, error: "Unauthorized access: Only authenticated Admin users can delete notes." };
  }

  return { authorized: true, user };
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

    const githubConfig = getGitHubConfig();
    if (!githubConfig.isConfigured) {
      return new Response(
        JSON.stringify({
          error: "GitHub environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO) are missing on server."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const bodyData = await request.json();
    const { filename, subject } = bodyData;

    if (!filename || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing filename or subject for deletion." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let cleanFilename = filename.trim().toLowerCase();
    if (!cleanFilename.endsWith(".md")) {
      cleanFilename += ".md";
    }

    const targetSubject = subject.toLowerCase().trim();
    const filePath = `src/content/${targetSubject}/${cleanFilename}`;
    const commitMessage = `admin(note): delete note ${filePath}`;

    const result = await deleteFileFromGitHub(filePath, commitMessage);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Note ${cleanFilename} deleted successfully from GitHub repository. The site will update on deployment.`,
        filePath: result.filePath,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Delete note error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to delete note from GitHub." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
