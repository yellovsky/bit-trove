import * as LabelPrimitive from '@radix-ui/react-label';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Label';

interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
}

const Label: FC<LabelProps> = ({ className, required, ...props }) => (
  <LabelPrimitive.Root
    className={cn(
      className,
      'font-medium text-sm data-[error=true]:text-destructive',
      required && 'after:text-red-10 after:content-["_*"]'
    )}
    {...props}
  />
);

Label.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Label;

export {
  Root,
  //
  Label,
};

export type { LabelProps };
