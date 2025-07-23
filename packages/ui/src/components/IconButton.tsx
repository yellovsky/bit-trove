import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { buttonVariants } from '@repo/ui/components/Button';
import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * IconButton
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'IconButton';

const iconButtonVariants = cva('justify-center', {
  compoundVariants: [
    {
      className: '-m-1',
      size: 'sm',
      variant: 'ghost',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'w-10 p-2',
      md: 'w-8 p-1',
      sm: 'w-6 p-0.5',
    },
    variant: {
      ghost: '',
      outline: '',
      soft: '',
      solid: '',
      surface: '',
    },
  },
});

type IconButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof iconButtonVariants> &
  WithPalette & { asChild?: boolean };

const IconButton: FC<IconButtonProps> = ({ className, variant, size, palette, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        buttonVariants({ size, variant }),
        iconButtonVariants({ size, variant }),
        palette && getPaletteClassName(palette),
        className
      )}
      data-slot="icon-button"
      {...props}
    />
  );
};

IconButton.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = IconButton;

export {
  Root,
  //
  IconButton,
};

export { iconButtonVariants };
export type { IconButtonProps };
