/**
 * Notes By FSir - Server-Side GitHub REST API Helper
 * SECURITY NOTE: This module only executes server-side and reads non-public environment variables.
 */

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  isConfigured: boolean;
}

export const getGitHubConfig = (): GitHubConfig => {
  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
  const owner = import.meta.env.GITHUB_OWNER || process.env.GITHUB_OWNER || "";
  const repo = import.meta.env.GITHUB_REPO || process.env.GITHUB_REPO || "";
  const branch = import.meta.env.GITHUB_BRANCH || process.env.GITHUB_BRANCH || "main";

  const isConfigured = Boolean(token && owner && repo && token.trim() !== "");

  return {
    token,
    owner,
    repo,
    branch,
    isConfigured,
  };
};

/**
 * Fetch file details and SHA from GitHub Repository Contents API
 */
export const fetchFileFromGitHub = async (filePath: string) => {
  const config = getGitHubConfig();
  if (!config.isConfigured) {
    throw new Error("GitHub integration is not configured. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in your environment variables.");
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${config.branch}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${config.token}`,
      "Accept": "application/vnd.github+json",
      "User-Agent": "NotesByFSir-AdminApp",
    },
  });

  if (response.status === 404) {
    return { exists: false, sha: null, content: "" };
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`GitHub API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawContent = data.content ? Buffer.from(data.content, "base64").toString("utf-8") : "";

  return {
    exists: true,
    sha: data.sha,
    content: rawContent,
    downloadUrl: data.download_url,
  };
};

/**
 * Save or update a Markdown file in GitHub repository
 */
export const saveFileToGitHub = async (
  filePath: string,
  content: string,
  commitMessage: string,
  sha?: string
) => {
  const config = getGitHubConfig();
  if (!config.isConfigured) {
    throw new Error("GitHub environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO) are missing.");
  }

  let fileSha = sha;
  if (!fileSha) {
    try {
      const existing = await fetchFileFromGitHub(filePath);
      if (existing.exists) {
        fileSha = existing.sha;
      }
    } catch {
      // File does not exist yet; safe to create as new
    }
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
  const base64Content = Buffer.from(content, "utf-8").toString("base64");

  const bodyPayload: Record<string, any> = {
    message: commitMessage,
    content: base64Content,
    branch: config.branch,
  };

  if (fileSha) {
    bodyPayload.sha = fileSha;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${config.token}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "NotesByFSir-AdminApp",
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Failed to commit file to GitHub: ${errorData.message || response.statusText}`);
  }

  const data = await response.json();
  return {
    success: true,
    commitSha: data.commit?.sha,
    filePath: data.content?.path,
  };
};

/**
 * Delete a Markdown file from GitHub repository
 */
export const deleteFileFromGitHub = async (
  filePath: string,
  commitMessage: string,
  sha?: string
) => {
  const config = getGitHubConfig();
  if (!config.isConfigured) {
    throw new Error("GitHub environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO) are missing.");
  }

  let fileSha = sha;
  if (!fileSha) {
    const existing = await fetchFileFromGitHub(filePath);
    if (!existing.exists || !existing.sha) {
      throw new Error(`File ${filePath} not found on GitHub repository.`);
    }
    fileSha = existing.sha;
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${config.token}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "NotesByFSir-AdminApp",
    },
    body: JSON.stringify({
      message: commitMessage,
      sha: fileSha,
      branch: config.branch,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Failed to delete file from GitHub: ${errorData.message || response.statusText}`);
  }

  return {
    success: true,
    filePath,
  };
};
