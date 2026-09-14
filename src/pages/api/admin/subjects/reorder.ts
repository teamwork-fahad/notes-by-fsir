import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { verifyAdminAuth } from "../../../../lib/adminAuth";
import { fetchFileFromGitHub, saveFileToGitHub, getGitHubConfig } from "../../../../lib/github";
import type { SubjectMeta } from "../../../../lib/subjects";

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
    const { items, expectedSha } = bodyData;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: 'items' array of reordered subject IDs is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const metadataPath = "src/data/subjects.json";
    const localFullPath = path.join(process.cwd(), metadataPath);

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
              JSON.stringify({ error: "SHA Conflict: Subject order has been modified by another admin. Please refresh and try again." }),
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

    // Extract submitted IDs
    const submittedIds = items.map((item: any) =>
      typeof item === "string" ? item.trim().toLowerCase() : (item.id || item.slug || "").trim().toLowerCase()
    );

    // Complete set validation: every existing subject must be present in submittedIds, and count must match
    const existingIdSet = new Set(currentSubjects.map((s) => s.id.toLowerCase()));
    const submittedIdSet = new Set(submittedIds);

    if (submittedIds.length !== currentSubjects.length || submittedIdSet.size !== existingIdSet.size) {
      return new Response(
        JSON.stringify({ error: "Reorder payload rejected: You must supply the complete set of all existing subject IDs without duplicates." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    for (const existingId of existingIdSet) {
      if (!submittedIdSet.has(existingId)) {
        return new Response(
          JSON.stringify({ error: `Reorder payload rejected: Missing subject ID '${existingId}'. Complete set is required.` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // SERVER-CALCULATED SEQUENTIAL ORDERS (1-based index)
    const serverOrderMap = new Map<string, number>();
    submittedIds.forEach((id: string, index: number) => {
      serverOrderMap.set(id, index + 1);
    });

    currentSubjects.forEach((subject) => {
      const newOrder = serverOrderMap.get(subject.id.toLowerCase()) ?? serverOrderMap.get(subject.slug.toLowerCase());
      if (typeof newOrder === "number") {
        subject.order = newOrder;
      }
    });

    // Sort array by server-calculated order
    currentSubjects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const formattedJson = JSON.stringify(currentSubjects, null, 2);
    const commitMessage = "admin(subject): reorder subject display sequence";

    // Save local
    let savedLocally = false;
    try {
      fs.writeFileSync(localFullPath, formattedJson, "utf-8");
      savedLocally = true;
    } catch (fsErr) {
      console.warn("Local FS reorder write warning:", fsErr);
    }

    // Save GitHub
    let githubResult = null;
    if (githubConfig.isConfigured) {
      try {
        githubResult = await saveFileToGitHub(metadataPath, formattedJson, commitMessage, currentSha);
      } catch (ghErr: any) {
        console.error("GitHub reorder commit error:", ghErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subjects reordered successfully!",
        commitSha: githubResult?.commitSha,
        savedLocally,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Reorder subjects API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to reorder subjects." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
