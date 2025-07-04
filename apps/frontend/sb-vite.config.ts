import { resolve, join} from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
export default defineConfig({
  plugins: [
		babel({
			filter: /\.[j|t]sx?$/,

			babelConfig: {
				plugins: ['babel-plugin-react-compiler'],
				presets: ['@babel/preset-typescript'],
			},
		}),
		tailwindcss(),
    tsconfigPaths(),
  ],

  ssr: {
    noExternal: [
      // these pachkages are internal monorepo packages
      '@repo/api-models',
      '@repo/ui',

      // this packages are cjs and must be compiled to be used with esm
      'jotai-tanstack-query',
			'@storybook/preview-api',
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
    },
  },


	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: join(__dirname, '.storybook'),
						storybookScript: 'pnpm storybook --no-open'
					})
				],
				test: {
					name: 'storybook/test', // This is where you specify the name of your project and this is what storybook expects
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium'
							}
						]
					},
					setupFiles: ['.storybook/vitest.setup.ts']
				}
			}
		]
	}
});
