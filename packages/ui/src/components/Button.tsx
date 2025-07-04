import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@repo/ui/lib/utils';

import { getPaletteClassName, type WithPalette } from '../lib/palette';

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

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  WithPalette & { asChild?: boolean };

const Button: React.FC<ButtonProps> = ({ className, variant, size, palette, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }), palette && getPaletteClassName(palette))}
      data-slot="button"
      {...props}
    />
  );
};

export { Button, buttonVariants, type ButtonProps };

// import { cva, type VariantProps } from 'class-variance-authority';
// import { Slot } from 'radix-ui';
// import type { ComponentProps, FC, ReactNode } from 'react';

// import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
// import { cn } from '@repo/ui/lib/utils';

// export const buttonVariants = cva(
//   "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-focus-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
//   {
//     defaultVariants: {
//       radius: 'sm',
//       size: 'md',
//       variant: 'filled',
//     },
//     variants: {
//       radius: {
//         full: 'rounded-full',
//         lg: 'rounded-lg',
//         md: 'rounded-md',
//         sm: 'rounded-sm',
//         xl: 'rounded-xl',
//         xs: 'rounded-xs',
//       },
//       size: {
//         lg: 'h-9 px-5.5',
//         md: 'h-8 px-5.5',
//         sm: 'h-7 px-4',
//         xl: 'h-10.5 px-6',
//         xs: 'h-6 px-3',
//       },
//       variant: {
//         dimmed: 'text-gray-12 hover:bg-primary-a3 active:bg-primary-a4',
//         filled: 'bg-accent font-medium text-accent-foreground hover:brightness-[1.08] active:brightness-[0.9]',
//         outline:
//           'inset-ring inset-ring-accent text-foreground hover:bg-secondary hover:brightness-[1.08] active:brightness-[0.9]',
//         secondary: 'bg-secondary text-secondary-foreground hover:bg-primary-a4 active:bg-primary-a5',
//         subtle: 'text-primary-11 hover:bg-primary-a3 active:bg-primary-a4',
//       },
//     },
//   }
// );

// export type ButtonProps = ComponentProps<'button'> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean;
//     leftElement?: ReactNode;
//     rightElement?: ReactNode;
//     palette?: Palette;
//   };

// export const Button: FC<ButtonProps> = ({
//   className,
//   variant,
//   size,
//   palette,
//   asChild = false,
//   leftElement,
//   rightElement,
//   children,
//   radius,
//   ...props
// }) => {
//   const Comp = asChild ? Slot.Root : 'button';

//   return (
//     <Comp
//       className={cn(className, buttonVariants({ radius, size, variant }), palette && getPaletteClassName(palette))}
//       {...props}
//     >
//       {leftElement}
//       <Slot.Slottable>{children}</Slot.Slottable>
//       {rightElement}
//     </Comp>
//   );
// };
