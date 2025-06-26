import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const headingVariants = cva('mb-2.5 scroll-m-20 text-balance font-heading tracking-tight first:mt-0', {
  variants: {
    size: {
      h1: 'mt-12 font-bold text-4xl leading-[1.3]',
      h2: 'mt-8 font-bold text-3xl leading-[1.35]',
      h3: 'mt-6 font-bold text-xl leading-[1.4]',
    },
  },
});

type HeadingProps = ComponentProps<'h1'> &
  VariantProps<typeof headingVariants> & { asChild?: boolean; order: 1 | 2 | 3 };

export const Heading: FC<HeadingProps> = ({ order, size, asChild = false, ...props }) => {
  const Comp = asChild ? Slot.Root : `h${order}`;
  const derivedSize: Exclude<VariantProps<typeof headingVariants>['size'], undefined> = size || `h${order}`;

  return <Comp {...props} className={cn(headingVariants({ size: derivedSize }), props.className)} />;
};
