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
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      radius: 'default',
      size: 'default',
      variant: 'default',
    },
    variants: {
      radius: {
        default: 'rounded-default',
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        sm: 'rounded-sm',
        xl: 'rounded-xl',
        xs: 'rounded-xs',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        icon: 'size-9',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
      },
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:brightness-[1.08] active:brightness-[0.9]',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:brightness-[1.08] focus-visible:ring-destructive/20 active:brightness-[0.9] dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        dimmed: 'text-gray-12 hover:bg-gray-a3 active:bg-gray-a4',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:brightness-[0.9] dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline active:brightness-[0.9]',
        outline:
          'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:brightness-[0.9] dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-primary-a4 active:bg-primary-a5',
      },
    },
  }
);

type CommonButtonProps = Omit<ComponentProps<'button'>, 'aria-label'> &
  Omit<VariantProps<typeof buttonVariants>, 'size'> &
  WithPalette & {
    asChild?: boolean;
  };

type IconButtonProps = CommonButtonProps & {
  size: 'icon';
  'aria-label': string;
};

type RegularButtonProps = CommonButtonProps & {
  size?: Exclude<VariantProps<typeof buttonVariants>['size'], 'icon'>;
  'aria-label'?: string;
};

type ButtonProps = IconButtonProps | RegularButtonProps;

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
