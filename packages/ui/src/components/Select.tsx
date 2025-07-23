import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { FC } from 'react';

import { useFormItemContext } from '@repo/ui/hooks/form-item-context';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Select
 * -----------------------------------------------------------------------------------------------*/
const Select: FC<SelectPrimitive.SelectProps> = (props) => <SelectPrimitive.Root data-slot="select" {...props} />;

/* -------------------------------------------------------------------------------------------------
 * SelectGroup
 * -----------------------------------------------------------------------------------------------*/
const SelectGroup: FC<SelectPrimitive.SelectGroupProps> = ({ ...props }) => (
  <SelectPrimitive.Group data-slot="select-group" {...props} />
);

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * -----------------------------------------------------------------------------------------------*/
const SelectValue: FC<SelectPrimitive.SelectValueProps> = ({ ...props }) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * -----------------------------------------------------------------------------------------------*/
const SelectTrigger: FC<SelectPrimitive.SelectTriggerProps> = ({ className, children, ...rest }) => {
  const itemContext = useFormItemContext();

  return (
    <SelectPrimitive.Trigger
      className={cn(
        'focus-visible-outline inset-ring inset-ring-gray-a7 inline-flex h-8 shrink-0 cursor-pointer select-none items-center justify-between gap-1.5 whitespace-nowrap rounded-default bg-gray-surface bg-clip-content px-2 text-start align-top text-gray-12 text-sm leading-[20px] hover:inset-ring-gray-a8 disabled:inset-ring-gray-a6 disabled:cursor-not-allowed disabled:bg-gray-a2 data-[placeholder]:text-gray-a10 [aria-invalid=true]:inset-ring-red-a7',
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="select-trigger"
      id={itemContext?.formItemId}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/
const SelectContent: FC<SelectPrimitive.SelectContentProps> = ({
  className,
  children,
  position = 'popper',
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative inset-ring inset-ring-gray-a7 z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-default bg-panel-solid shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',

        position === 'popper' &&
          'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',

        className
      )}
      data-slot="select-content"
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 p-2'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

/* -------------------------------------------------------------------------------------------------
 * SelectLabel
 * -----------------------------------------------------------------------------------------------*/
const SelectLabel: FC<SelectPrimitive.SelectLabelProps> = ({ className, ...props }) => (
  <SelectPrimitive.Label
    className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
    data-slot="select-label"
    {...props}
  />
);

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * -----------------------------------------------------------------------------------------------*/
const SelectItem: FC<SelectPrimitive.SelectItemProps> = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex h-8 cursor-pointer select-none scroll-m-1 items-center rounded-default px-5 outline-none data-[disabled]:cursor-default data-[highlighted]:bg-primary-9 data-[disabled]:text-gray-a8 data-[highlighted]:text-primary-contrast',
      className
    )}
    data-slot="select-item"
    {...props}
  >
    <span className="absolute left-0 inline-flex w-5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

/* -------------------------------------------------------------------------------------------------
 * SelectSeparator
 * -----------------------------------------------------------------------------------------------*/
const SelectSeparator: FC<SelectPrimitive.SelectSeparatorProps> = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    className={cn('pointer-events-none my-2 ms-5 h-px bg-gray-a6', className)}
    data-slot="select-separator"
    {...props}
  />
);

/* -------------------------------------------------------------------------------------------------
 * SelectScrollUpButton
 * -----------------------------------------------------------------------------------------------*/
const SelectScrollUpButton: FC<SelectPrimitive.SelectScrollUpButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1 hover:bg-accent', className)}
    data-slot="select-scroll-up-button"
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
);

/* -------------------------------------------------------------------------------------------------
 * SelectScrollDownButton
 * -----------------------------------------------------------------------------------------------*/
const SelectScrollDownButton: FC<SelectPrimitive.SelectScrollDownButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1 hover:bg-accent', className)}
    data-slot="select-scroll-down-button"
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
);

/* -----------------------------------------------------------------------------------------------*/

const Root = Select;
const Group = SelectGroup;
const Value = SelectValue;
const Trigger = SelectTrigger;
const Content = SelectContent;
const Label = SelectLabel;
const Item = SelectItem;
const Separator = SelectSeparator;
const ScrollUpButton = SelectScrollUpButton;
const ScrollDownButton = SelectScrollDownButton;

export {
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
  //
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from '@radix-ui/react-select';
