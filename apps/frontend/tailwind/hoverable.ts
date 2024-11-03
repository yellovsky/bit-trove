// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const hoverable: PluginCreator = ({ addVariant }) =>
  addVariant('hoverable', '@media (hover: hover) {&}');
