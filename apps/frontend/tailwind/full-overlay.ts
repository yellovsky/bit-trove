// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const fullOverlay: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.full-overlay': {
      height: '100%',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%',
    },
  });
