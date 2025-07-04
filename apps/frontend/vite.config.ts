import { resolve } from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
		 babel({
			filter: /\.[j|t]sx?$/,
			babelConfig: {
				plugins: ['babel-plugin-react-compiler', {}],
				presets: ['@babel/preset-typescript'],
			},
		}),

		tailwindcss(),
    reactRouterDevTools({ client: { position: 'middle-right' } }),
    reactRouter(),
    reactRouterHonoServer({ dev: { exclude: [/^\/(resources)\/.+/], },}),
    tsconfigPaths(),
  ],

  ssr: {
    noExternal: [
      // these pachkages are internal monorepo packages
      '@repo/api-models',
      '@repo/ui',

      // this packages are cjs and must be compiled to be used with esm
      'jotai-tanstack-query',
			'tiptap-extension-code-block-shiki'
    ],
  },

  resolve: {
    alias: {
      '@app': resolve('app/app'),
      '@entities': resolve('app/entities'),
      '@features': resolve('app/features'),
      '@shared': resolve('app/shared'),
      '@widgets': resolve('app/widgets'),
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },

	server: {
    host: true,
  },
});
