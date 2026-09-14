import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { verifyAdminAuth } from "../../../../lib/adminAuth";
import { fetchFileFromGitHub, saveFileToGitHub, getGitHubConfig } from "../../../../lib/github";
import type { ChapterMeta } from "../../../../lib/chapters";

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
    const { subject, id, title, path: chapterPath, order, published, expectedSha } = bodyData;

    if (!subject || !id || !title || !chapterPath) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: subject, id, title, path." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanSubject = subject.trim().toLowerCase();
    const cleanId = id.trim().toLowerCase();
    const cleanPath = chapterPath.trim().toLowerCase();
    const slugRegex = /^[a-z0-9-]+$/;

    if (!slugRegex.test(cleanSubject) || !slugRegex.test(cleanId) || !slugRegex.test(cleanPath)) {
      return new Response(
        JSON.stringify({ error: "Invalid subject, chapter ID, or path. Only lowercase alphanumeric characters and hyphens are allowed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (cleanPath.includes("..") || cleanPath.includes("/") || cleanPath.includes("\\")) {
      return new Response(
        JSON.stringify({ error: "Path traversal character sequence rejected." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!ALLOWED_COLLECTIONS.has(cleanSubject)) {
      return new Response(
        JSON.stringify({ error: `Subject collection '${cleanSubject}' is not registered in the system.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const metadataPath = "src/data/chapters.json";
    const localFullPath = path.join(process.cwd(), metadataPath);

    // 1. Read existing chapters data
    let currentChapters: ChapterMeta[] = [];
    let currentSha: string | undefined = undefined;

    const githubConfig = getGitHubConfig();
    if (githubConfig.isConfigured) {
      try {
        const ghFile = await fetchFileFromGitHub(metadataPath);
        if (ghFile.exists) {
          currentSha = ghFile.sha ?? undefined;
          if (expectedSha && currentSha && expectedSha !== currentSha) {
            return new Response(
              JSON.stringify({ error: "SHA Conflict: Remote chapters metadata has been updated by another admin. Please refresh and try again." }),
              { status: 409, headers: { "Content-Type": "application/json" } }
            );
          }
          currentChapters = JSON.parse(ghFile.content);
        }
      } catch (err: any) {
        console.warn("GitHub fetch chapters warning:", err.message);
      }
    }

    if (currentChapters.length === 0 && fs.existsSync(localFullPath)) {
      const raw = fs.readFileSync(localFullPath, "utf-8");
      currentChapters = JSON.parse(raw);
    }

    // 2. Check if updating existing or adding new
    const existingIndex = currentChapters.findIndex(
      (c) =>
        c.subject.toLowerCase() === cleanSubject &&
        (c.id.toLowerCase() === cleanId || c.path.toLowerCase() === cleanPath)
    );

    const isNew = existingIndex === -1;

    const updatedChapter: ChapterMeta = {
      subject: cleanSubject,
      id: cleanId,
      title: title.trim(),
      path: cleanPath,
      order: typeof order === "number" ? order : isNew ? currentChapters.length + 1 : 1,
      published: typeof published === "boolean" ? published : true,
    };

    if (isNew) {
      currentChapters.push(updatedChapter);
    } else {
      currentChapters[existingIndex] = {
        ...currentChapters[existingIndex],
        ...updatedChapter,
      };
    }

    // Sort by subject then order ASC
    currentChapters.sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      return (a.order ?? 0) - (b.order ?? 0);
    });

    const formattedJson = JSON.stringify(currentChapters, null, 2);
    const commitMessage = `admin(chapter): ${isNew ? "create" : "update"} chapter '${cleanPath}' in subject '${cleanSubject}'`;

    // 3. Save ONLY to chapters.json on local disk (NO folder/.gitkeep creation)
    let savedLocally = false;
    try {
      const dirPath = path.dirname(localFullPath);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(localFullPath, formattedJson, "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      console.warn("Local FS write chapters warning:", fsErr);
    }

    // 4. Commit ONLY chapters.json to GitHub (NO folder/.gitkeep creation)
    let githubResult = null;
    let githubError: string | null = null;

    if (githubConfig.isConfigured) {
      try {
        githubResult = await saveFileToGitHub(metadataPath, formattedJson, commitMessage, currentSha);
      } catch (ghErr: any) {
        githubError = ghErr.message;
        console.error("GitHub commit chapters error:", ghErr);
      }
    }

    if (!githubResult && !savedLocally) {
      return new Response(
        JSON.stringify({ error: githubError || "Failed to save chapter metadata." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Chapter metadata for '${title}' saved successfully!`,
        chapter: updatedChapter,
        commitSha: githubResult?.commitSha,
        savedLocally,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Save chapter API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to save chapter metadata." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
