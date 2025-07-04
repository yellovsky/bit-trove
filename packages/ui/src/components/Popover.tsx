import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Popover
 * -----------------------------------------------------------------------------------------------*/
const POPOVER_NAME = 'Popover';

const Popover: FC<PopoverPrimitive.PopoverProps> = (props) => <PopoverPrimitive.Root data-slot="popover" {...props} />;

Popover.displayName = POPOVER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverTrigger
 * -----------------------------------------------------------------------------------------------*/
const TRIGGER_NAME = 'PopoverTrigger';

const PopoverTrigger: FC<PopoverPrimitive.PopoverTriggerProps> = (props) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

PopoverTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverContent
 * -----------------------------------------------------------------------------------------------*/
const CONTENT_NAME = 'PopoverContent';

const PopoverContent: FC<PopoverPrimitive.PopoverContentProps> = ({
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

PopoverContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * PopoverAnchor
 * -----------------------------------------------------------------------------------------------*/
const ANCHOR_NAME = 'PopoverAnchor';

const PopoverAnchor: FC<PopoverPrimitive.PopoverAnchorProps> = (props) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);
PopoverAnchor.displayName = ANCHOR_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Popover;
const Trigger = PopoverTrigger;
const Content = PopoverContent;
const Anchor = PopoverAnchor;

export {
  Root,
  Trigger,
  Content,
  Anchor,
  //
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
};

export type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
