import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const dividerVariants = cva('h-px bg-gray-7');

export type DividerProps = ComponentProps<'div'> & VariantProps<typeof dividerVariants>;

export const Divider: FC<DividerProps> = ({ className, ...props }) => (
  <div {...props} className={cn(dividerVariants(), className)} />
);
