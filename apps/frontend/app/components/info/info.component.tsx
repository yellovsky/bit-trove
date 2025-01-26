// global modules
import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { info as infoCn } from './info.module.scss';

export interface InfoProps extends PropsWithChildren {
  className?: string;
}

export const Info: FC<InfoProps> = ({ children, className }) => (
  <div className={clsx(className, infoCn)}>{children}</div>
);
