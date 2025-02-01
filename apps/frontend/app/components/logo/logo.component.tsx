// global modules
import type { FC } from 'react';

// local modules
import logoURL from './images/bt-logo-no-square.svg?url';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => <img className={className} src={logoURL} />;
