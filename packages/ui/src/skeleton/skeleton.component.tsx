// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import { applyBorderRadius, type BorderRadiusProps } from '@repo/ui/apply-border-radius';
import { applySpacing, type SpacingProps } from '@repo/ui/apply-spacing';
import type { FC, PropsWithChildren } from 'react';

// local modules
import { isLoaded as isLoadedCn, skeleton as skeletonCn } from './skeleton.module.scss';

interface SkeletonProps extends PropsWithChildren, SpacingProps, BorderRadiusProps {
  className?: string;
  ratio?: number;
  isLoaded?: boolean;
}

const applyCn = R.compose(applyBorderRadius<SkeletonProps>, applySpacing<SkeletonProps>);

export const Skeleton: FC<SkeletonProps> = (props) => {
  const { className, ratio, isLoaded, ...rest } = applyCn(props);

  return (
    <div
      {...rest}
      className={clsx(className, skeletonCn, isLoaded && isLoadedCn)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    />
  );
};
