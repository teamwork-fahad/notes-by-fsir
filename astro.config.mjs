import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Vite plugin to shim missing applyPolyfills in Astro 7 for Vercel adapter
const shimAstroNodePolyfills = () => ({
  name: 'shim-astro-node-polyfills',
  enforce: 'pre',
  resolveId(id, importer) {
    if (id === 'astro/app/node' && !importer?.includes('astro-node-shim')) {
      return '\0astro-node-shim';
    }
  },
  load(id) {
    if (id === '\0astro-node-shim') {
      return `
        export * from 'astro/app/node';
        export function applyPolyfills() {}
      `;
    }
  }
});

// Create Vercel adapter and patch astro:build:ssr hook for Astro 7 compatibility
const vercelAdapter = vercel({
  entrypointResolution: 'auto',
});

const originalBuildSsr = vercelAdapter.hooks['astro:build:ssr'];
if (originalBuildSsr) {
  vercelAdapter.hooks['astro:build:ssr'] = async (options) => {
    if (options && !options.entryPoints) {
      options.entryPoints = options.routes
        ? new Map(options.routes.map(r => [{ component: r.component, pattern: r.pattern, prerender: r.prerender }, r.entrypoint]))
        : new Map();
    }
    return originalBuildSsr(options);
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: vercelAdapter,
  vite: {
    plugins: [shimAstroNodePolyfills()],
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
    },
  },
});
