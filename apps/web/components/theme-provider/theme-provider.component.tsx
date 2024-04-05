// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

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
      props.dark ? darkThemeCn : lightThemeCn,
      props.withoutBackground && withoutBackgroundCn
    )}
  >
    {props.children}
  </div>
);
