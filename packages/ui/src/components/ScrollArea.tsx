import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

interface ScrollAreaProps extends ComponentProps<typeof ScrollAreaPrimitive.Viewport> {
  orientation?: 'horizontal' | 'vertical';
}

export const ScrollArea: FC<ScrollAreaProps> = ({ children, orientation = 'vertical', className, ...rest }) => (
  <ScrollAreaPrimitive.Root
    className={cn(
      'overflow-hidden',
      orientation === 'horizontal' && 'w-full',
      orientation === 'vertical' && 'h-full',
      className
    )}
  >
    <ScrollAreaPrimitive.Viewport {...rest} className="size-full rounded">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      className="flex touch-none select-none bg-gray-surface p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="vertical"
    >
      <ScrollAreaPrimitive.Thumb className="before:-translate-x-1/2 before:-translate-y-1/2 relative flex-1 rounded-[10px] bg-gray-10 before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-11 before:min-w-11" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar
      className="flex touch-none select-none bg-gray-surface p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="horizontal"
    >
      <ScrollAreaPrimitive.Thumb className="before:-translate-x-1/2 before:-translate-y-1/2 relative flex-1 rounded-[10px] bg-gray-10 before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-[44px] before:min-w-[44px]" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className="bg-blackA5" />
  </ScrollAreaPrimitive.Root>
);
