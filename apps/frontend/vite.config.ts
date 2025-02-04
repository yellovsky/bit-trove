// global modules
import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import path from 'path';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  build: {
    target: 'esnext',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  optimizeDeps: {
    exclude: [path.join(__dirname, 'node_modules/.vite/deps')],
    force: true,
    esbuildOptions: {
      target: 'esnext',
    },
  },
  plugins: [remix(), tsconfigPaths()],
  server: {
    host: true,
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*.tsx'],
    },
  },
});
