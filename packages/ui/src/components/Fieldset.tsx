import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@repo/ui/lib/utils';

const fieldsetVariants = cva('relative rounded', {
  defaultVariants: {
    radius: 'md',
    variant: 'default',
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
    },
    variant: {
      default: 'border border-border px-4.5 pt-3 pb-4',
      filled: 'border border-border bg-panel px-4.5 pt-3 pb-4',
      unstyled: '',
    },
  },
});

type FieldsetProps = ComponentProps<'fieldset'> & VariantProps<typeof fieldsetVariants> & { legend?: ReactNode };

export const Fieldset: FC<FieldsetProps> = ({ children, className, legend, variant, radius, ...rest }) => (
  <fieldset className={cn(fieldsetVariants({ radius, variant }), className)} {...rest}>
    {legend ? <legend className="mb-0 font-medium text-muted-foreground text-sm">{legend}</legend> : null}
    {children}
  </fieldset>
);
