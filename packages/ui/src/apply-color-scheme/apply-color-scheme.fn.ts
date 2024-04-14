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

export const applyColorScheme: ApplyClassname<ColorSchemeProps> = (defaults) => (props) => {
  const propsWithDefaults = { ...defaults, ...props };
  const { colorScheme, ...rest } = propsWithDefaults;

  return {
    ...rest,
    className: clsx(rest.className, colorScheme ? `color-scheme-${colorScheme}` : undefined),
  };
};
