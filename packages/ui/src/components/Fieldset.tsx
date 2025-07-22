import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@repo/ui/lib/utils';

const fieldsetVariants = cva('relative rounded', {
  defaultVariants: {
    radius: 'default',
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
      filled: 'border border-border bg-primary-2 px-4.5 pt-3 pb-4',
      unstyled: '',
    },
  },
});

type FieldsetProps = ComponentProps<'fieldset'> & VariantProps<typeof fieldsetVariants> & { legend?: ReactNode };

export const Fieldset: FC<FieldsetProps> = ({ children, className, legend, variant, radius, ...rest }) => (
  <fieldset className={cn(className, fieldsetVariants({ radius, variant }))} {...rest}>
    {legend ? <legend className="font-medium text-muted-foreground text-sm">{legend}</legend> : null}
    {children}
  </fieldset>
);
