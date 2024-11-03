// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const textOverflowEllipsis: PluginCreator = ({ addComponents }) =>
  addComponents({
    '.text-overflow-ellipsis': {
      display: 'block',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
  });
