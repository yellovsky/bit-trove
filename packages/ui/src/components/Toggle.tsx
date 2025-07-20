import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const toggleVariants = cva(
  "focus-visible-outline inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm transition-[color,box-shadow] disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:focus-visible:inset-ring-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      radius: 'default',
      size: 'md',
      variant: 'dimmed',
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
        dimmed:
          'font-medium disabled:text-gray-a8 data-[state=on]:bg-primary-a3 data-[state=off]:text-gray-a12 data-[state=on]:text-gray-a12 data-[state=on]:active:bg-primary-a5 not-disabled:data-[state=off]:active:bg-primary-a4 data-[state=on]:hover:bg-primary-a4 not-disabled:data-[state=off]:hover:bg-primary-a3',
      },
    },
  }
);

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & { palette?: Palette; isActive?: boolean };

export const Toggle: FC<ToggleProps> = ({ className, variant, size, palette, isActive, radius, ...props }) => (
  <TogglePrimitive.Root
    className={cn(toggleVariants({ radius, size, variant }), palette && getPaletteClassName(palette), className)}
    data-slot="toggle"
    {...props}
    data-state={isActive ? 'on' : 'off'}
  />
);
