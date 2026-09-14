import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { verifyAdminAuth } from "../../../lib/adminAuth";
import { fetchFileFromGitHub, saveFileToGitHub, getGitHubConfig } from "../../../lib/github";

export const prerender = false;

const ALLOWED_COLLECTIONS = new Set([
  "php", "python", "java", "cpp", "c", "mysql", "dsa", "html", "css", "js", "maths", "foc", "docs"
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
    const { subject, items } = bodyData;

    if (!subject || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required reorder parameters: subject and non-empty items array." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let targetSubject = subject.toLowerCase().trim();
    if (targetSubject === "c++") targetSubject = "cpp";
    if (targetSubject === "javascript") targetSubject = "js";

    if (!ALLOWED_COLLECTIONS.has(targetSubject)) {
      return new Response(
        JSON.stringify({ error: `Invalid subject collection '${targetSubject}'.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const githubConfig = getGitHubConfig();
    let updatedCount = 0;
    const errors: string[] = [];

    // Extract & sanitize filenames
    const sanitizedFilenames: string[] = [];
    for (const item of items) {
      const rawName = typeof item === "string" ? item : item.filename || item.id || "";
      const baseName = path.basename(rawName.trim());

      if (!baseName || baseName.includes("..") || baseName.includes("/") || baseName.includes("\\")) {
        return new Response(
          JSON.stringify({ error: `Invalid or suspicious filename: '${rawName}'.` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      let filename = baseName;
      if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) {
        filename += ".md";
      }

      sanitizedFilenames.push(filename);
    }

    // Ensure no duplicate filenames in submitted payload
    const uniqueSet = new Set(sanitizedFilenames);
    if (uniqueSet.size !== sanitizedFilenames.length) {
      return new Response(
        JSON.stringify({ error: "Reorder payload rejected: Duplicate filenames detected in submission." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Process each item using server-calculated sequential order index (1-based)
    for (let index = 0; index < sanitizedFilenames.length; index++) {
      const filename = sanitizedFilenames[index];
      const newOrder = index + 1;

      const relativeFilePath = `src/content/${targetSubject}/${filename}`;
      const fullLocalPath = path.join(process.cwd(), relativeFilePath);

      let rawContent = "";
      let sha = "";

      // 1. Try reading raw content locally
      if (fs.existsSync(fullLocalPath)) {
        rawContent = fs.readFileSync(fullLocalPath, "utf-8");
      }

      // 2. Try fetching raw content & SHA from GitHub if configured
      if (githubConfig.isConfigured) {
        try {
          const ghFile = await fetchFileFromGitHub(relativeFilePath);
          if (ghFile.exists) {
            sha = ghFile.sha || "";
            if (ghFile.content) {
              rawContent = ghFile.content;
            }
          }
        } catch (ghErr: any) {
          console.warn(`Could not fetch GitHub SHA for ${relativeFilePath}:`, ghErr.message);
        }
      }

      if (!rawContent) {
        errors.push(`File ${filename} not found in collection '${targetSubject}'.`);
        continue;
      }

      // Update or Insert 'order: X' key in YAML Frontmatter
      let updatedContent = rawContent;
      if (/^---[\s\S]*?---/.test(rawContent)) {
        if (/^order:\s*\d+/m.test(rawContent)) {
          updatedContent = rawContent.replace(/^order:\s*\d+/m, `order: ${newOrder}`);
        } else {
          updatedContent = rawContent.replace(/^---/, `---\norder: ${newOrder}`);
        }
      } else {
        updatedContent = `---\norder: ${newOrder}\n---\n\n${rawContent}`;
      }

      // Write to local disk
      try {
        fs.writeFileSync(fullLocalPath, updatedContent, "utf-8");
      } catch (fsErr) {
        console.warn(`Failed to write local file ${fullLocalPath}:`, fsErr);
      }

      // Commit to GitHub if configured
      if (githubConfig.isConfigured) {
        try {
          await saveFileToGitHub(
            relativeFilePath,
            updatedContent,
            `admin(note): reorder ${filename} to position ${newOrder}`,
            sha || undefined
          );
          updatedCount++;
        } catch (ghErr: any) {
          errors.push(`GitHub update failed for ${filename}: ${ghErr.message}`);
        }
      } else {
        updatedCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully updated display order for ${updatedCount} notes.`,
        updatedCount,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to reorder notes." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
