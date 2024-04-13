// global modules
import cn from 'classnames';
import { applyBorderRadius, type BorderRadiusProps } from '@bit-trove/ui/apply-border-radius';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { aspectRatio as aspectRatioCn } from './aspect-ratio.module.scss';

interface AspectRatioProps extends PropsWithChildren, BorderRadiusProps {
  ratio: number;
  className?: string;
}

export const AspectRatio: FC<AspectRatioProps> = (props) => {
  const { ratio, className, ...rest } = applyBorderRadius(props);
  return <div {...rest} className={cn(className, aspectRatioCn)} style={{ aspectRatio: ratio }} />;
};
