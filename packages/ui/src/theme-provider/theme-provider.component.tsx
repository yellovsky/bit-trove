// global modules
import cn from 'classnames';
import { Roboto, Voces } from 'next/font/google';
import type { CSSProperties, FC, PropsWithChildren } from 'react';

// local modules
import {
  holder as holderCn,
  darkTheme as darkThemeCn,
  lightTheme as lightThemeCn,
  withoutBackground as withoutBackgroundCn,
} from './theme-provider.module.scss';

// =============================================================
//                     F O N T S
// =============================================================
const poppins = Voces({
  variable: '--title-font-family',
  weight: ['400'],
  subsets: ['latin'],
});
const roboto = Roboto({ variable: '--general-font-family', weight: '400', subsets: ['latin'] });

interface ThemeProviderProps extends PropsWithChildren {
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
  withoutBackground?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => (
  <div
    style={props.style}
    className={cn(
      holderCn,
      props.className,
      roboto.variable,
      poppins.variable,
      props.dark ? darkThemeCn : lightThemeCn,
      props.withoutBackground && withoutBackgroundCn
    )}
  >
    {props.children}
  </div>
);
