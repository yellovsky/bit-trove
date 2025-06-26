import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { FC } from 'react';

import { useFormItemContext } from '@repo/ui/hooks/form-item-context';
import { cn } from '@repo/ui/lib/utils';

export const Select: FC<SelectPrimitive.SelectProps> = (props) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
);

export const SelectGroup: FC<SelectPrimitive.SelectGroupProps> = ({ ...props }) => (
  <SelectPrimitive.Group data-slot="select-group" {...props} />
);

export const SelectValue: FC<SelectPrimitive.SelectValueProps> = ({ ...props }) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);

export const SelectTrigger: FC<SelectPrimitive.SelectTriggerProps> = ({ className, children, ...rest }) => {
  const itemContext = useFormItemContext();

  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex w-fit cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-default border border-input-border bg-input-bg px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] hover:not-disabled:bg-input-bg/50 focus-visible:inset-ring-2 focus-visible:inset-ring-focus-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:text-destructive-foreground aria-invalid:ring-destructive aria-invalid:focus-visible:inset-ring-destructive data-[size=default]:h-9 data-[size=sm]:h-8 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
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

export const SelectContent: FC<SelectPrimitive.SelectContentProps> = ({
  className,
  children,
  position = 'popper',
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-default border border-input-border bg-popover text-gray-12 shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',

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
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectLabel: FC<SelectPrimitive.SelectLabelProps> = ({ className, ...props }) => (
  <SelectPrimitive.Label
    className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
    data-slot="select-label"
    {...props}
  />
);

export const SelectItem: FC<SelectPrimitive.SelectItemProps> = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className
    )}
    data-slot="select-item"
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export const SelectSeparator: FC<SelectPrimitive.SelectSeparatorProps> = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 pointer-events-none my-1 h-px bg-gray-a6', className)}
    data-slot="select-separator"
    {...props}
  />
);

export const SelectScrollUpButton: FC<SelectPrimitive.SelectScrollUpButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1 hover:bg-accent', className)}
    data-slot="select-scroll-up-button"
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
);

export const SelectScrollDownButton: FC<SelectPrimitive.SelectScrollDownButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1 hover:bg-accent', className)}
    data-slot="select-scroll-down-button"
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
);
