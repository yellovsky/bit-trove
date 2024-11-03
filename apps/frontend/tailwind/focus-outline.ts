// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const focusOutline: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.focus-outline': {
      'outline-offset': '0px',
      'outline-style': 'solid',
      'outline-width': '2px',

      'outline-color': 'var(--color-focus-outline)',
    },

    '.focus-outline-b': {
      outline: 'none',

      'box-shadow': '0 1px 0 0 var(--color-focus-outline)',
    },
  });
