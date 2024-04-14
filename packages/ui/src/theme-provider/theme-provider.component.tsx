// global modules
import './theme-provider.scss';
import type { FC, PropsWithChildren } from 'react';

interface ThemeProviderProps extends PropsWithChildren {
  colorMode: 'dark' | 'light';
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => (
  <div data-color-mode={props.colorMode}>{props.children}</div>
);
