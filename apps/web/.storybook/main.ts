import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    // '../src/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),

    {
      name: getAbsolutePath('@storybook/addon-styling-webpack'),
      options: {
        rules: [
          {
            test: /^((?!\.module).)*\.s[ac]ss$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: { namedExport: false },
                },
              },
              {
                loader: 'sass-loader',
                options: { implementation: require.resolve('sass') },
              },
            ],
          },
          {
            test: /\.module\.s[ac]ss$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: { namedExport: true, localIdentName: '[local]--[hash:base64:5]' },
                },
              },
              {
                loader: 'sass-loader',
                options: { implementation: require.resolve('sass') },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};
export default config;
