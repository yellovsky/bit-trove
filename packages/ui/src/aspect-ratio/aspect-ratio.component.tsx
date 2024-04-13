// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { aspectRatio as aspectRatioCn } from './aspect-ratio.module.scss';

interface AspectRatioProps extends PropsWithChildren {
  ratio: number;
  className?: string;
}

export const AspectRatio: FC<AspectRatioProps> = ({ ratio, className, ...rest }) => (
  <div {...rest} className={cn(className, aspectRatioCn)} style={{ aspectRatio: ratio }} />
);
