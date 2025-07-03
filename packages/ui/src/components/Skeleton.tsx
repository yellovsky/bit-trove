import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Skeleton: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('animate-pulse rounded-md bg-gray-5', className)} data-slot="skeleton" {...props} />
);
