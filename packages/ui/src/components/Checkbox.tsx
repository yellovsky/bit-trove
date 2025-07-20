import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { type ComponentProps, type FC, type ReactNode, useId } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Checkbox';

const checkoboxVariants = cva(
  "peer focus-visible-outline size-4 shrink-0 rounded-[3px] disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-3",
  {
    defaultVariants: {
      variant: 'surface',
    },
    variants: {
      variant: {
        soft: 'bg-primary-a5 text-primary-a11',
        surface:
          'bg-primary-surface text-primary-contrast disabled:inset-ring-gray-a6 disabled:bg-gray-a3 data-[state=unchecked]:inset-ring data-[state=unchecked]:inset-ring-input not-disabled:data-[state=checked]:bg-primary-indicator not-disabled:data-[state=indeterminate]:bg-primary-indicator data-[state=unchecked]:aria-invalid:inset-ring-destructive data-[state=checked]:aria-invalid:bg-destructive',
      },
    },
  }
);

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkoboxVariants> & {
    label?: ReactNode;
    description?: ReactNode;
  };

const Checkbox: FC<CheckboxProps> = ({ className, label, description, id: propsId, variant, ...props }) => {
  const hookId = useId();
  const id = propsId ?? hookId;

  return (
    <div className="flex items-start space-x-2">
      <CheckboxPrimitive.Root
        checked={props.checked}
        className={checkoboxVariants({ className, variant })}
        data-slot="checkbox"
        id={id}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          {props.checked === 'indeterminate' ? <MinusIcon strokeWidth={3} /> : <CheckIcon strokeWidth={3} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={id}
            >
              {label}
            </label>
          )}
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      )}
    </div>
  );
};

Checkbox.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Checkbox;

export {
  Root,
  //
  Checkbox,
};

export type { CheckboxProps };
