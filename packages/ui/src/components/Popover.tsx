import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Popover: FC<ComponentProps<typeof PopoverPrimitive.Root>> = (props) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
);

export const PopoverTrigger: FC<ComponentProps<typeof PopoverPrimitive.Trigger>> = (props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

export const PopoverContent: FC<ComponentProps<typeof PopoverPrimitive.Content>> = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-default border border-border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot="popover-content"
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

export const PopoverAnchor: FC<ComponentProps<typeof PopoverPrimitive.Anchor>> = (props) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);
