// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import { logo as logoCn } from './logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => <div className={clsx(logoCn, className)} />;
