import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const DropdownMenu: FC<ComponentProps<typeof DropdownMenuPrimitive.Root>> = ({ ...props }) => (
  <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
);

export const DropdownMenuPortal: FC<ComponentProps<typeof DropdownMenuPrimitive.Portal>> = ({ ...props }) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);

export const DropdownMenuTrigger: FC<ComponentProps<typeof DropdownMenuPrimitive.Trigger>> = ({ ...props }) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
);

export const DropdownMenuContent: FC<ComponentProps<typeof DropdownMenuPrimitive.Content>> = ({
  className,
  sideOffset = 4,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-default border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuGroup: FC<ComponentProps<typeof DropdownMenuPrimitive.Group>> = ({ ...props }) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
};

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ className, inset, variant = 'default', ...props }) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-default px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-inset={inset}
    data-slot="dropdown-menu-item"
    data-variant={variant}
    {...props}
  />
);

export const DropdownMenuCheckboxItem: FC<ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>> = ({
  className,
  children,
  checked,
  ...props
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-default py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-slot="dropdown-menu-checkbox-item"
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

export const DropdownMenuRadioGroup: FC<ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>> = ({ ...props }) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);

export const DropdownMenuRadioItem: FC<ComponentProps<typeof DropdownMenuPrimitive.RadioItem>> = ({
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-default py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-slot="dropdown-menu-radio-item"
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({ className, inset, ...props }) => (
  <DropdownMenuPrimitive.Label
    className={cn('px-2 py-1.5 font-medium text-sm data-[inset]:pl-8', className)}
    data-inset={inset}
    data-slot="dropdown-menu-label"
    {...props}
  />
);

export const DropdownMenuSeparator: FC<ComponentProps<typeof DropdownMenuPrimitive.Separator>> = ({
  className,
  ...props
}) => (
  <DropdownMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    data-slot="dropdown-menu-separator"
    {...props}
  />
);

export const DropdownMenuShortcut: FC<ComponentProps<'span'>> = ({ className, ...props }) => (
  <span
    className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
    data-slot="dropdown-menu-shortcut"
    {...props}
  />
);

export const DropdownMenuSub: FC<ComponentProps<typeof DropdownMenuPrimitive.Sub>> = ({ ...props }) => (
  <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
);

type DropdownMenuSubTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
};
export const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = ({ className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      'flex cursor-default select-none items-center rounded-default px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground',
      className
    )}
    data-inset={inset}
    data-slot="dropdown-menu-sub-trigger"
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent: FC<ComponentProps<typeof DropdownMenuPrimitive.SubContent>> = ({
  className,
  ...props
}) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-default border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    data-slot="dropdown-menu-sub-content"
    {...props}
  />
);
