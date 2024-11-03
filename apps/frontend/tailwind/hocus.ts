// global modules
import type { PluginCreator } from 'tailwindcss/types/config';

export const hocus: PluginCreator = ({ addVariant }) =>
  addVariant('hocus', ['&:hover', '&:focus-visible']);
