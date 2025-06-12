import type { FC } from 'react';

import logoUrl from './images/logo.svg?url';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = (props) => <img alt="logo" className={props.className} src={logoUrl} />;
