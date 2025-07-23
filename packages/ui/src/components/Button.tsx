import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Button';

const buttonVariants = cva(
  "focus-visible-outline inline-flex cursor-pointer flex-nowrap items-center justify-center gap-2 disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      radius: 'default',
      size: 'md',
      variant: 'solid',
    },
    variants: {
      radius: {
        default: 'rounded-default',
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        none: 'rounded-none',
        sm: 'rounded-sm',
        xl: 'rounded-xl',
        xs: 'rounded-xs',
      },
      size: {
        lg: 'h-10 gap-3 px-4 text-base',
        md: 'h-8 gap-2 px-3 text-sm',
        sm: 'h-6 gap-1 px-2 text-xs',
      },
      variant: {
        ghost: 'text-gray-a12 not-disabled:hover:bg-primary-a3 not-disabled:active:bg-primary-a4 disabled:text-gray-a8',
        outline:
          'inset-ring inset-ring-primary-a8 font-medium text-primary-a11 not-disabled:hover:bg-primary-a2 not-disabled:active:bg-primary-a3 disabled:inset-ring-gray-a7 disabled:text-gray-a8',
        soft: 'bg-primary-a3 font-medium text-primary-a11 hover:bg-primary-a4 active:bg-primary-a5 disabled:bg-gray-a3 disabled:text-gray-a8',
        solid:
          'bg-primary-9 font-medium text-primary-contrast hover:bg-primary-10 active:brightness-[0.92] active:saturate-[1.1] disabled:bg-gray-a3 disabled:text-gray-a8',
        surface:
          'inset-ring inset-ring-primary-a7 bg-primary-surface font-medium text-primary-a11 not-disabled:hover:inset-ring-primary-a8 not-disabled:active:inset-ring-primary-a8 not-disabled:active:bg-primary-a3 disabled:inset-ring-gray-a6 disabled:bg-gray-a2 disabled:text-gray-a8',
      },
    },
  }
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & WithPalette & { asChild?: boolean };

const Button: FC<ButtonProps> = ({ className, variant, size, palette, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }), palette && getPaletteClassName(palette))}
      data-slot="button"
      {...props}
    />
  );
};

Button.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Button;

export {
  Root,
  //
  Button,
};

export { buttonVariants };
export type { ButtonProps };
