// global modules
import cn from 'classnames';
import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { Roboto, Voces } from 'next/font/google';

// local modules
import {
  darkTheme as darkThemeCn,
  holder as holderCn,
  lightTheme as lightThemeCn,
  withoutBackground as withoutBackgroundCn,
} from './theme-provider.module.scss';

// =============================================================
//                     F O N T S
// =============================================================
const poppins = Voces({
  subsets: ['latin'],
  variable: '--title-font-family',
  weight: ['400'],
});
const roboto = Roboto({ subsets: ['latin'], variable: '--general-font-family', weight: '400' });

interface ThemeProviderProps extends PropsWithChildren {
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
  withoutBackground?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => (
  <div
    className={cn(
      holderCn,
      props.className,
      roboto.variable,
      poppins.variable,
      props.dark ? darkThemeCn : lightThemeCn,
      props.withoutBackground && withoutBackgroundCn
    )}
    style={props.style}
  >
    {props.children}
  </div>
);
