import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const kbdVariants = cva(
  'rounded-sm border border-gray-7 border-b-3 bg-gray-2 px-1.5 py-0.5 text-gray-11 text-sm'
);

export type KbdProps = ComponentProps<'kbd'> & VariantProps<typeof kbdVariants>;

export const Kbd: FC<KbdProps> = ({ className, ...props }) => (
  <kbd {...props} className={cn(kbdVariants(), className)} />
);
