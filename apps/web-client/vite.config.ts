import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import path from 'path';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  resolve: {
    alias: {
      '@repo/ui/src': path.join(__dirname, '../../packages/ui/src'),
    },
  },

  plugins: [remix(), tsconfigPaths()],
});
