import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

import { getPaletteClassName, type WithPalette } from '../lib/palette';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3 [a&,button&]:cursor-pointer',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&,button&]:hover:bg-primary/90',
        destructive:
          'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&,button&]:hover:bg-destructive/90',
        outline: 'text-foreground [a&,button&]:hover:bg-accent [a&,button&]:hover:text-accent-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&,button&]:hover:bg-secondary/90',
      },
    },
  }
);

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants> & WithPalette & { asChild?: boolean };

const Badge: FC<BadgeProps> = ({ className, variant, palette, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn(badgeVariants({ variant }), palette && getPaletteClassName(palette), className)}
      data-slot="badge"
      {...props}
    />
  );
};

export { Badge, badgeVariants, type BadgeProps };
