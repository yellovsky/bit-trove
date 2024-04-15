// global modules
import type { ApplyClassname } from '@repo/ui/apply-classname';
import clsx from 'clsx';

export type ColorSchemeType =
  | 'primary'
  | 'yellow'
  | 'gray'
  | 'red'
  | 'green'
  | 'orange'
  | 'black-alpha'
  | 'white-alpha';

export interface ColorSchemeProps {
  colorScheme?: ColorSchemeType;
}

export const applyColorScheme: ApplyClassname<ColorSchemeProps> = (props) => {
  const { colorScheme, ...rest } = props;

  return {
    ...rest,
    className: clsx(rest.className, colorScheme ? `color-scheme-${colorScheme}` : undefined),
  };
};
