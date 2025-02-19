// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import { loader as loaderCn } from './spinner.module.scss';

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(loaderCn, className)} />
);
