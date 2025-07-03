import { cx } from 'class-variance-authority';

// TODO move to some config
export const PALETTES = ['primary', 'red', 'green', 'amber', 'slate', 'gray', 'blue'] as const;
export type Palette = (typeof PALETTES)[number];
export type WithPalette = { palette?: Palette };

export const getPaletteClassName = (palette: Palette) =>
  cx(
    {
      'primary-amber': palette === 'amber',
      'primary-blue': palette === 'blue',
      'primary-gray': palette === 'gray',
      'primary-green': palette === 'green',
      'primary-red': palette === 'red',
      'primary-slate': palette === 'slate',
      'primary-teal': palette === 'primary',
    },
    'components-palette'
  );
