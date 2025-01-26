import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    resolve: {
      alias: {
        '@repo/ui/src': path.join(__dirname, '../../packages/ui/src'),
      },
    },

    // no Remix Vite plugin here
    plugins: [tsconfigPaths()],
  };
});
