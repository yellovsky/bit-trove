// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import { applyBorderRadius, type BorderRadiusProps } from '@bit-trove/ui/apply-border-radius';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { aspectRatio as aspectRatioCn } from './aspect-ratio.module.scss';

interface AspectRatioProps extends PropsWithChildren, BorderRadiusProps, SpacingProps {
  ratio: number;
  className?: string;
}

const applyCn = R.compose(applyBorderRadius<AspectRatioProps>(), applySpacing<AspectRatioProps>());

export const AspectRatio: FC<AspectRatioProps> = (props) => {
  const { ratio, className, ...rest } = applyCn(props);
  return (
    <div {...rest} className={clsx(className, aspectRatioCn)} style={{ aspectRatio: ratio }} />
  );
};
