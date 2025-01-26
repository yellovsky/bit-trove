// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const pagePaddingVertical: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.page-padding-vertical': {
      '@apply py-12': {},
    },
  });

export const pagePaddingHorizontal: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.page-padding-horizontal': {
      '@apply xl:px-9 lg:px-6 md:px-4 p-3': {},
    },
  });
