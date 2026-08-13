import type { APIRoute } from "astro";
import { getSupabaseConfig } from "../../../lib/supabase";
import { saveFileToGitHub, getGitHubConfig } from "../../../lib/github";

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

  // 2. Query Profiles Table to verify Admin Role
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
    return { authorized: false, error: "Unauthorized access: Only authenticated Admin users can save notes." };
  }

  return { authorized: true, user };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // SECURITY GUARD: Verify Admin Authorization
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
          error: "GitHub environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO) are missing on the server."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const bodyData = await request.json();
    const { filename, title, description, subject, chapter, author, body: markdownBody, sha } = bodyData;

    if (!title || !subject || !chapter || !filename) {
      return new Response(
        JSON.stringify({ error: "Required note metadata missing (title, subject, chapter, filename)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Clean safe filename formatting
    let cleanFilename = filename.trim().toLowerCase();
    if (!cleanFilename.endsWith(".md")) {
      cleanFilename += ".md";
    }

    const targetSubject = subject.toLowerCase().trim();
    const filePath = `src/content/${targetSubject}/${cleanFilename}`;

    // Format clean Frontmatter & Content
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || "").replace(/"/g, '\\"')}"
subject: "${subject}"
chapter: "${chapter}"
author: "${author || "Fahad Sir"}"
---

${markdownBody || ""}`;

    const commitMessage = `admin(note): ${sha ? "update" : "create"} ${chapter} - ${title}`;

    const result = await saveFileToGitHub(filePath, frontmatter, commitMessage, sha);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Note saved successfully to GitHub repository. The live website will automatically rebuild and update on Vercel.",
        filePath: result.filePath,
        commitSha: result.commitSha,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Save note error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to save note to GitHub." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
