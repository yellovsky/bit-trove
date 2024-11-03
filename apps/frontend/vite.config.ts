import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import path from 'path';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  optimizeDeps: {
    exclude: ['@repo/ui', path.join(__dirname, 'node_modules/.vite/deps')],
    force: true,
  },
  plugins: [remix(), tsconfigPaths()],
  resolve: {
    alias: {
      '@repo/ui/src': path.join(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    host: true,
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*.tsx'],
    },
  },
});
