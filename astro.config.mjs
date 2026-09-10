import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Vite plugin to shim missing applyPolyfills in Astro 7 for Vercel adapter
const shimAstroNodePolyfills = () => ({
  name: 'shim-astro-node-polyfills',
  enforce: 'pre',
  resolveId(id) {
    if (id === 'astro/app/node') {
      return '\0astro/app/node-shim';
    }
  },
  load(id) {
    if (id === '\0astro/app/node-shim') {
      return `
        import {
          NodeApp,
          loadApp,
          loadManifest,
          createRequest,
          createRequestFromNodeRequest,
          writeResponse,
          getAbortControllerCleanup
        } from "astro/dist/core/app/node.js";

        export function applyPolyfills() {}

        export {
          NodeApp,
          createRequest,
          createRequestFromNodeRequest,
          getAbortControllerCleanup,
          loadApp,
          loadManifest,
          writeResponse
        };
      `;
    }
  }
});

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
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
