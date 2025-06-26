import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';
import { Link as RouterLink } from 'react-router';

import { useEnhanceTo } from '@repo/ui/hooks/enhance-to';
import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const linkVariants = cva('cursor-pointer', {
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    variant: {
      primary:
        'underline-offset(--spacing) text-primary-a11 decoration-1 decoration-primary-a5 hover:underline active:text-primary-a10',
      unstyled: 'no-underline',
    },
  },
});

type LinkProps = ComponentProps<typeof RouterLink> & VariantProps<typeof linkVariants> & { palette?: Palette };

export const Link: FC<LinkProps> = ({ palette, className, variant, ...props }) => {
  const enhanceTo = useEnhanceTo();
  const echancedLink = enhanceTo ? enhanceTo(props.to) : props.to;

  return (
    <RouterLink
      {...props}
      className={cn(linkVariants({ variant }), palette && getPaletteClassName(palette), className)}
      to={echancedLink}
    />
  );
};
