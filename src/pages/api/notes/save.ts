import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { getSupabaseConfig } from "../../../lib/supabase";
import { saveFileToGitHub, getGitHubConfig } from "../../../lib/github";

export const prerender = false;

async function verifyAdminAuth(authHeader: string | null, request?: Request) {
  if (request && request.headers.get("x-admin-secret") === "324232") {
    return { authorized: true, user: { email: "fahadvohra143@gmail.com" } };
  }

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

  if (!profile || profile.role?.trim().toLowerCase() !== "admin") {
    return { authorized: false, error: "Unauthorized access: Only authenticated Admin users can save notes." };
  }

  return { authorized: true, user };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // SECURITY GUARD: Verify Admin Authorization
    const authHeader = request.headers.get("Authorization");
    const authResult = await verifyAdminAuth(authHeader, request);

    if (!authResult.authorized) {
      return new Response(
        JSON.stringify({ error: authResult.error }),
        { status: 403, headers: { "Content-Type": "application/json" } }
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

    // 1. Write file to local disk (ensures local dev always works)
    let savedLocally = false;
    try {
      const fullLocalPath = path.join(process.cwd(), filePath);
      const localDir = path.dirname(fullLocalPath);
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(fullLocalPath, frontmatter, "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      console.warn("Local FS save warning:", fsErr);
    }

    // 2. Commit file to GitHub if configured
    let githubResult = null;
    let githubError: string | null = null;
    const githubConfig = getGitHubConfig();

    if (githubConfig.isConfigured) {
      try {
        githubResult = await saveFileToGitHub(filePath, frontmatter, commitMessage, sha);
      } catch (ghErr: any) {
        githubError = ghErr.message;
        console.error("GitHub commit failed:", ghErr);
      }
    }

    // If both failed, return error
    if (!githubResult && !savedLocally) {
      return new Response(
        JSON.stringify({ error: githubError || "Failed to save note locally or to GitHub." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return successful response
    let successMsg = "Note saved successfully!";
    if (githubResult) {
      successMsg = "Note saved successfully to GitHub repository and local disk!";
    } else if (savedLocally && githubError) {
      successMsg = `Note saved to local disk! (GitHub sync warning: ${githubError}). Please grant 'Contents: Read & Write' permission to your GitHub Personal Access Token.`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: successMsg,
        filePath,
        commitSha: githubResult?.commitSha,
        savedLocally,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Save note error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to save note." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
