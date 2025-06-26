import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md font-medium transition-[color,box-shadow] [&>svg]:pointer-events-none [&>svg]:size-3 [a&,button&]:cursor-pointer',
  {
    compoundVariants: [
      { className: 'w-5 rounded-full px-1', round: true, size: 'md' },
      { className: 'w-6 rounded-full px-1', round: true, size: 'lg' },
      { className: 'w-4.5 rounded-full px-1', round: true, size: 'sm' },
      { className: 'w-8 rounded-full px-1', round: true, size: 'xl' },
      { className: 'w-4 px-1rounded-full', round: true, size: 'xs' },
    ],
    defaultVariants: {
      radius: 'sm',
      size: 'md',
      variant: 'filled',
    },
    variants: {
      radius: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        sm: 'rounded-sm',
        xl: 'rounded-xl',
        xs: 'rounded-xs',
      },
      round: {
        true: 'rounded-full',
      },
      size: {
        lg: 'h-6 px-2 text-sm',
        md: 'h-5 px-1.5 text-xs',
        sm: 'h-4.5 px-1 text-[0.625rem]',
        xl: 'h-8 px-2.5 text-base',
        xs: 'h-4 px-[0.25rem] text-[0.5rem]',
      },
      variant: {
        filled:
          'border-transparent bg-primary-a3 text-primary-a11 [a&,button&]:hover:bg-primary-a4 [a&,button&]:active:bg-primary-a5',
        outline:
          'inset-ring inset-ring-primary-a8 bg-primary-surface text-primary-a11 [a&,button&]:hover:inset-ring-primary-a7 [a&,button&]:active:inset-ring-primary-a9',
      },
    },
  }
);

export type BadgeProps = ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; palette?: Palette };

export const Badge: FC<BadgeProps> = ({
  className,
  variant,
  palette,
  size,
  radius,
  round,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      className={cn(
        badgeVariants({ radius, round, size, variant }),
        palette && getPaletteClassName(palette),
        className
      )}
      {...props}
    >
      {round ? (
        <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 truncate whitespace-nowrap">
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </Comp>
  );
};
