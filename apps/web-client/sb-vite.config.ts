import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    resolve: {
      alias: {
        '@bit-trove/theme': path.join(__dirname, '../../packages/theme'),
        '@bit-trove/ui/src': path.join(__dirname, '../../packages/ui/src'),
      },
    },

    // no Remix Vite plugin here
    plugins: [tsconfigPaths()],
  };
});
