import type { APIRoute } from "astro";
import { getGitHubConfig } from "../../../lib/github";

export const prerender = false;

export const GET: APIRoute = async () => {
  const config = getGitHubConfig();

  return new Response(
    JSON.stringify({
      isConfigured: config.isConfigured,
      owner: config.owner || null,
      repo: config.repo || null,
      branch: config.branch || "main",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
