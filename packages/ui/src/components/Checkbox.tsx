import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Checkbox';

interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: ReactNode;
  description?: ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({ className, label, description, ...props }) => (
  <div className="flex items-start space-x-2">
    <CheckboxPrimitive.Root
      checked={props.checked}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-input-border bg-input-bg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        {props.checked === 'indeterminate' ? <MinusIcon className="h-3 w-3" /> : <CheckIcon className="h-3 w-3" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {(label || description) && (
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    )}
  </div>
);

Checkbox.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Checkbox;

export {
  Root,
  //
  Checkbox,
};

export type { CheckboxProps };
