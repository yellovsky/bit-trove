// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { Poppins, Roboto } from 'next/font/google';

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
const poppins = Poppins({
  variable: '--title-font-family',
  weight: ['400', '700'],
  subsets: ['latin'],
});
const roboto = Roboto({ variable: '--general-font-family', weight: '400', subsets: ['latin'] });

interface ThemeProviderProps extends PropsWithChildren {
  dark?: boolean;
  className?: string;
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
  >
    {props.children}
  </div>
);
