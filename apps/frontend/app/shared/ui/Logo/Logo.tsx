import type { FC } from 'react';

import logoUrl from './images/logo.svg?url';
import logoShortUrl from './images/logo-short.svg?url';

interface LogoProps {
  short?: boolean;
  className?: string;
}

export const Logo: FC<LogoProps> = (props) => (
  <img alt="logo" className={props.className} src={props.short ? logoShortUrl : logoUrl} />
);
