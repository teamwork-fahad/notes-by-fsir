import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { verifyAdminAuth } from "../../../../lib/adminAuth";
import { fetchFileFromGitHub, saveFileToGitHub, getGitHubConfig } from "../../../../lib/github";
import type { ChapterMeta } from "../../../../lib/chapters";

export const prerender = false;

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
    const { subject, items, expectedSha } = bodyData;

    if (!subject || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: 'subject' string and 'items' array of reordered chapter IDs are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanSubject = subject.trim().toLowerCase();
    const metadataPath = "src/data/chapters.json";
    const localFullPath = path.join(process.cwd(), metadataPath);

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
              JSON.stringify({ error: "SHA Conflict: Chapter order has been modified by another admin. Please refresh and try again." }),
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

    // Filter chapters belonging to target subject
    const subjectChapters = currentChapters.filter((c) => c.subject.toLowerCase() === cleanSubject);

    if (subjectChapters.length === 0) {
      return new Response(
        JSON.stringify({ error: `No existing chapters found for subject '${cleanSubject}'.` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract submitted IDs
    const submittedIds = items.map((item: any) =>
      typeof item === "string" ? item.trim().toLowerCase() : (item.id || item.path || "").trim().toLowerCase()
    );

    // Complete set validation for subject's chapters
    const existingIdSet = new Set(subjectChapters.map((c) => c.id.toLowerCase()));
    const submittedIdSet = new Set(submittedIds);

    if (submittedIds.length !== subjectChapters.length || submittedIdSet.size !== existingIdSet.size) {
      return new Response(
        JSON.stringify({ error: `Reorder payload rejected: You must supply the complete set of chapter IDs for subject '${cleanSubject}' without duplicates.` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    for (const existingId of existingIdSet) {
      if (!submittedIdSet.has(existingId)) {
        return new Response(
          JSON.stringify({ error: `Reorder payload rejected: Missing chapter ID '${existingId}' for subject '${cleanSubject}'. Complete set is required.` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // SERVER-CALCULATED SEQUENTIAL ORDERS (1-based index)
    const serverOrderMap = new Map<string, number>();
    submittedIds.forEach((id: string, index: number) => {
      serverOrderMap.set(id, index + 1);
    });

    currentChapters.forEach((chapter) => {
      if (chapter.subject.toLowerCase() === cleanSubject) {
        const newOrder = serverOrderMap.get(chapter.id.toLowerCase()) ?? serverOrderMap.get(chapter.path.toLowerCase());
        if (typeof newOrder === "number") {
          chapter.order = newOrder;
        }
      }
    });

    // Re-sort chapters array
    currentChapters.sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      return (a.order ?? 0) - (b.order ?? 0);
    });

    const formattedJson = JSON.stringify(currentChapters, null, 2);
    const commitMessage = `admin(chapter): reorder chapter display sequence for subject '${cleanSubject}'`;

    // Save local
    let savedLocally = false;
    try {
      fs.writeFileSync(localFullPath, formattedJson, "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      console.warn("Local FS reorder chapters warning:", fsErr);
    }

    // Save GitHub
    let githubResult = null;
    if (githubConfig.isConfigured) {
      try {
        githubResult = await saveFileToGitHub(metadataPath, formattedJson, commitMessage, currentSha);
      } catch (ghErr: any) {
        console.error("GitHub reorder chapters commit error:", ghErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Chapters for '${cleanSubject}' reordered successfully!`,
        commitSha: githubResult?.commitSha,
        savedLocally,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Reorder chapters API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to reorder chapters." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
