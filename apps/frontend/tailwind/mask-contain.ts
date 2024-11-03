// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const maskContain: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.mask-contain': {
      'mask-position': 'center',
      'mask-repeat': 'no-repeat',
      'mask-size': 'contain',
    },
  });
