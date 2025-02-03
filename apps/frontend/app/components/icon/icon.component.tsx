// global modules
import clsx from 'clsx';
import type { FC, HTMLAttributes } from 'react';

// local modules
import styles from './icon.module.scss';

export const ICON_TYPES = [
  'article',
  'burger',
  'eye',
  'eyeClosed',
  'home',
  'info',
  'moon',
  'scroll',
  'sun',
  'warningCircle',
] as const;
export type IconType = (typeof ICON_TYPES)[number];

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: IconType;
}

export const Icon: FC<IconProps> = ({ className, type, ...rest }) => (
  <div {...rest} className={clsx(styles.icon, className, styles[type])} />
);
