// global modules
import * as R from 'ramda';
import cn from 'classnames';
import type { PropsWithChildren } from 'react';
import { withSpacing } from '@bit-trove/ui/with-spacing';
import { withBorderRadius } from '@bit-trove/ui/with-border-radius';

// local modules
import { skeleton as skeletonCn } from './skeleton.module.scss';

interface SkeletonProps extends PropsWithChildren {
  className?: string;
}

export const Skeleton = withSpacing(
  withBorderRadius((props: SkeletonProps) => (
    <div {...props} className={cn(props.className, skeletonCn)} />
  ))
);
