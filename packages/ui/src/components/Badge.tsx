import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Badge
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Badge';

const badgeVariants = cva(
  'focus-visible-outline inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap px-1.5 py-0.5 font-medium text-xs tracking-[0.0025em] transition-[color,box-shadow] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3 [a&,button&]:cursor-pointer',
  {
    defaultVariants: {
      radius: 'default',
      variant: 'solid',
    },
    variants: {
      radius: {
        default: 'rounded-default',
        full: 'rounded-full',
      },
      variant: {
        outline: 'inset-ring inset-ring-primary-a8 text-primary-a11',
        soft: 'bg-primary-a3 text-primary-a11',
        solid: 'bg-primary-9 text-primary-contrast',
        surface: 'inset-ring inset-ring-primary-a6 bg-primary-surface text-primary-a11',
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

Badge.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Badge;

export {
  Root,
  //
  Badge,
};

export type { BadgeProps };
