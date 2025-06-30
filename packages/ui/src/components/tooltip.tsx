import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const TooltipProvider: FC<ComponentProps<typeof TooltipPrimitive.Provider>> = ({
  delayDuration = 0,
  ...props
}) => <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;

TooltipProvider.displayName = 'TooltipProvider';

export const Tooltip: FC<ComponentProps<typeof TooltipPrimitive.Root>> = (props) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

Tooltip.displayName = 'Tooltip';

export const TooltipTrigger: FC<ComponentProps<typeof TooltipPrimitive.Trigger>> = (props) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipContent: FC<ComponentProps<typeof TooltipPrimitive.Content>> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={cn(
        'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-default bg-primary-foreground px-3 py-1.5 text-primary text-xs data-[state=closed]:animate-out',
        className
      )}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary-foreground fill-primary-foreground" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

TooltipContent.displayName = 'TooltipContent';
