// global modules
import cn from 'classnames';
import type { PropsWithChildren } from 'react';
import { withBorderRadius } from '@bit-trove/ui/with-border-radius';

// local modules
import { skeleton as skeletonCn } from './skeleton.module.scss';

interface SkeletonProps extends PropsWithChildren {
  className?: string;
}

export const Skeleton = withBorderRadius((props: SkeletonProps) => (
  <div {...props} className={cn(props.className, skeletonCn)} />
));
