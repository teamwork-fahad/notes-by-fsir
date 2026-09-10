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

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    entrypointResolution: 'auto',
  }),
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
