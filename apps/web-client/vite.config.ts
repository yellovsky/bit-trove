import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

installGlobals();

export default defineConfig({
  resolve: {
    alias: {
      '@bit-trove/theme': path.join(__dirname, '../../packages/theme'),
      '@bit-trove/ui/src': path.join(__dirname, '../../packages/ui/src'),
    },
  },

  plugins: [remix(), tsconfigPaths()],
});