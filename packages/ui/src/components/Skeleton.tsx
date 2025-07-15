import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Skeleton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Skeleton';

type SkeletonProps = ComponentProps<'div'>;

const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => (
  <div className={cn('animate-pulse rounded-default bg-gray-5', className)} data-slot="skeleton" {...props} />
);

Skeleton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Skeleton };
export type { SkeletonProps };
