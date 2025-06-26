import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, FC, ReactNode } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
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
      size: {
        lg: 'h-9 px-5.5',
        md: 'h-8 px-5.5',
        sm: 'h-7 px-4',
        xl: 'h-10.5 px-6',
        xs: 'h-6 px-3',
      },
      variant: {
        dimmed: 'text-gray-12 hover:bg-primary-a3 active:bg-primary-a4',
        filled: 'bg-accent font-medium text-accent-foreground hover:brightness-[1.08] active:brightness-[0.9]',
        outline:
          'inset-ring inset-ring-accent text-foreground hover:bg-secondary hover:brightness-[1.08] active:brightness-[0.9]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-primary-a4 active:bg-primary-a5',
        subtle: 'text-primary-11 hover:bg-primary-a3 active:bg-primary-a4',
      },
    },
  }
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    palette?: Palette;
  };

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  palette,
  asChild = false,
  leftElement,
  rightElement,
  children,
  radius,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      className={cn(className, buttonVariants({ radius, size, variant }), palette && getPaletteClassName(palette))}
      {...props}
    >
      {leftElement}
      <Slot.Slottable>{children}</Slot.Slottable>
      {rightElement}
    </Comp>
  );
};
