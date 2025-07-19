import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * TooltipProvider
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Tooltip';

const TooltipProvider: FC<TooltipPrimitive.TooltipProviderProps> = ({ delayDuration = 0, ...props }) => (
  <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
);

TooltipProvider.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * Tooltip
 * -----------------------------------------------------------------------------------------------*/
const TOOLTIP_NAME = 'Tooltip';

const Tooltip: FC<TooltipPrimitive.TooltipProps> = (props) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

Tooltip.displayName = TOOLTIP_NAME;

/* -------------------------------------------------------------------------------------------------
 * TooltipTrigger
 * -----------------------------------------------------------------------------------------------*/
const TOOLTIP_TRIGGER_NAME = 'TooltipTrigger';

const TooltipTrigger: FC<TooltipPrimitive.TooltipTriggerProps> = (props) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TooltipContent
 * -----------------------------------------------------------------------------------------------*/
const TOOLTIP_CONTENT_NAME = 'TooltipContent';

const TooltipContent: FC<TooltipPrimitive.TooltipContentProps> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(
        'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out',
        className
      )}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

TooltipContent.displayName = TOOLTIP_CONTENT_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = TooltipProvider;
const Trigger = TooltipTrigger;
const Content = TooltipContent;

export {
  Root,
  Trigger,
  Content,
  //
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
};

export type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from '@radix-ui/react-tooltip';
