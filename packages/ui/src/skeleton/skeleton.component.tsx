// global modules
import * as R from 'ramda';
import cn from 'classnames';
import { applyBorderRadius, type BorderRadiusProps } from '@bit-trove/ui/apply-border-radius';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { skeleton as skeletonCn } from './skeleton.module.scss';

interface SkeletonProps extends PropsWithChildren, SpacingProps, BorderRadiusProps {
  className?: string;
  ratio?: number;
}

const applyCn = R.compose(applyBorderRadius<SkeletonProps>(), applySpacing<SkeletonProps>());

export const Skeleton: FC<SkeletonProps> = (props) => {
  const { className, ratio, ...rest } = applyCn(props);

  return (
    <div
      {...rest}
      className={cn(className, skeletonCn)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    />
  );
};
