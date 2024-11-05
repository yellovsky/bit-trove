export type ColorMode = 'light' | 'dark';

export const isColorMode = (mode: unknown): mode is ColorMode =>
  mode === 'light' || mode === 'dark';
