import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-[color,box-shadow] focus-visible:inset-ring-2 focus-visible:inset-ring-focus-ring disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:focus-visible:inset-ring-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        lg: 'h-9 min-w-9 px-2',
        md: 'h-8 min-w-8 px-1',
        sm: 'h-7 min-w-7 px-1',
        xl: 'h-10.5 min-w-10.5 px-3',
        xs: 'h-6 min-w-6 px-0.5',
      },
      variant: {
        dimmed:
          'hover:brightness-[1.08] active:brightness-[0.9] data-[state=off]:bg-transparent data-[state=on]:bg-primary-9 data-[state=off]:text-gray-12 data-[state=on]:text-primary-contrast data-[state=off]:hover:bg-gray-surface [&]:disabled:text-gray-9',
      },
    },
  }
);

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & { palette?: Palette; isActive?: boolean };

export const Toggle: FC<ToggleProps> = ({ className, variant, size, palette, isActive, radius, ...props }) => (
  <TogglePrimitive.Root
    className={cn(
      toggleVariants({ className, radius, size, variant }),
      palette && getPaletteClassName(palette),
      className
    )}
    data-slot="toggle"
    {...props}
    data-state={isActive ? 'on' : 'off'}
  />
);
