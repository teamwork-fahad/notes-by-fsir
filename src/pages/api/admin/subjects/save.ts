import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { verifyAdminAuth } from "../../../../lib/adminAuth";
import { fetchFileFromGitHub, saveFileToGitHub, getGitHubConfig } from "../../../../lib/github";
import type { SubjectMeta } from "../../../../lib/subjects";

export const prerender = false;

const ALLOWED_COLLECTIONS = new Set([
  "php", "python", "java", "cpp", "c", "mysql", "plsql", "dsa", "html", "css", "js", "maths", "foc", "docs"
]);

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
    const { id, slug, name, icon, description, order, published, expectedSha } = bodyData;

    if (!id || !slug || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: id, slug, name." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanSlug = slug.trim().toLowerCase();
    const cleanId = id.trim().toLowerCase();
    const slugRegex = /^[a-z0-9-]+$/;

    if (!slugRegex.test(cleanSlug) || !slugRegex.test(cleanId)) {
      return new Response(
        JSON.stringify({ error: "Invalid subject slug or ID. Only lowercase letters, numbers, and hyphens are allowed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Path traversal guard
    if (cleanSlug.includes("..") || cleanSlug.includes("/") || cleanSlug.includes("\\")) {
      return new Response(
        JSON.stringify({ error: "Path traversal character sequence rejected." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Collection registration check
    if (!ALLOWED_COLLECTIONS.has(cleanSlug) && !ALLOWED_COLLECTIONS.has(cleanId)) {
      return new Response(
        JSON.stringify({ error: `Subject collection '${cleanSlug}' is not registered in the system. Collection support must be configured first.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const metadataPath = "src/data/subjects.json";
    const localFullPath = path.join(process.cwd(), metadataPath);

    // 1. Read existing subjects data
    let currentSubjects: SubjectMeta[] = [];
    let currentSha: string | undefined = undefined;

    const githubConfig = getGitHubConfig();
    if (githubConfig.isConfigured) {
      try {
        const ghFile = await fetchFileFromGitHub(metadataPath);
        if (ghFile.exists) {
          currentSha = ghFile.sha ?? undefined;
          if (expectedSha && currentSha && expectedSha !== currentSha) {
            return new Response(
              JSON.stringify({ error: "SHA Conflict: Remote subjects metadata has been updated by another admin. Please refresh and try again." }),
              { status: 409, headers: { "Content-Type": "application/json" } }
            );
          }
          currentSubjects = JSON.parse(ghFile.content);
        }
      } catch (err: any) {
        console.warn("GitHub fetch subjects warning:", err.message);
      }
    }

    if (currentSubjects.length === 0 && fs.existsSync(localFullPath)) {
      const raw = fs.readFileSync(localFullPath, "utf-8");
      currentSubjects = JSON.parse(raw);
    }

    // 2. Update existing or append new entry
    const existingIndex = currentSubjects.findIndex(
      (s) => s.id.toLowerCase() === cleanId || s.slug.toLowerCase() === cleanSlug
    );

    const isNew = existingIndex === -1;

    const updatedSubject: SubjectMeta = {
      id: cleanId,
      slug: cleanSlug,
      name: name.trim(),
      icon: (icon || "📚").trim(),
      description: (description || "").trim(),
      order: typeof order === "number" ? order : isNew ? currentSubjects.length + 1 : 1,
      published: typeof published === "boolean" ? published : true,
    };

    if (isNew) {
      currentSubjects.push(updatedSubject);
    } else {
      currentSubjects[existingIndex] = {
        ...currentSubjects[existingIndex],
        ...updatedSubject,
      };
    }

    // Sort by order ASC
    currentSubjects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const formattedJson = JSON.stringify(currentSubjects, null, 2);
    const commitMessage = `admin(subject): ${isNew ? "create" : "update"} subject '${cleanSlug}'`;

    // 3. Save ONLY to subjects.json on local disk (NO folder/.gitkeep creation)
    let savedLocally = false;
    try {
      const dirPath = path.dirname(localFullPath);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(localFullPath, formattedJson, "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      console.warn("Local FS write subjects warning:", fsErr);
    }

    // 4. Commit ONLY subjects.json to GitHub (NO folder/.gitkeep creation)
    let githubResult = null;
    let githubError: string | null = null;

    if (githubConfig.isConfigured) {
      try {
        githubResult = await saveFileToGitHub(metadataPath, formattedJson, commitMessage, currentSha);
      } catch (ghErr: any) {
        githubError = ghErr.message;
        console.error("GitHub commit subjects error:", ghErr);
      }
    }

    if (!githubResult && !savedLocally) {
      return new Response(
        JSON.stringify({ error: githubError || "Failed to save subject metadata." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Subject metadata for '${name}' saved successfully!`,
        subject: updatedSubject,
        commitSha: githubResult?.commitSha,
        savedLocally,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Save subject API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to save subject metadata." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
