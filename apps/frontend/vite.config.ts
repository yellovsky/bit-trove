import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';
import { vitePlugin as remix } from '@remix-run/dev';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  define: {
    // 'process.env': process.env,
    // 'process.env': R.pick(['API_HOST', 'CLIENT_HOST'], process.env),
  },
  optimizeDeps: {
    exclude: [path.join(__dirname, 'node_modules/.vite/deps')],
    force: true,
  },
  plugins: [
    remix(),
    tsconfigPaths(),
    tailwindcss(),
    NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
  ],
  server: {
    host: true,
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*.tsx'],
    },
  },
});
