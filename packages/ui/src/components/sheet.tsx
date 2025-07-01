import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Sheet: FC<ComponentProps<typeof SheetPrimitive.Root>> = ({ ...props }) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

export const SheetTrigger: FC<ComponentProps<typeof SheetPrimitive.Trigger>> = ({ ...props }) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

export const SheetClose: FC<ComponentProps<typeof SheetPrimitive.Close>> = ({ ...props }) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

export const SheetPortal: FC<ComponentProps<typeof SheetPrimitive.Portal>> = ({ ...props }) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

export const SheetOverlay: FC<ComponentProps<typeof SheetPrimitive.Overlay>> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    data-slot="sheet-overlay"
    {...props}
  />
);

export const SheetContent: FC<
  ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
> = ({ className, children, side = 'right', ...props }) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={cn(
        'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
        side === 'right' &&
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left' &&
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top' &&
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        side === 'bottom' &&
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
        className
      )}
      data-slot="sheet-content"
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);

export const SheetHeader: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1.5 p-4', className)} data-slot="sheet-header" {...props} />
);

export const SheetFooter: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} data-slot="sheet-footer" {...props} />
);

export const SheetTitle: FC<ComponentProps<typeof SheetPrimitive.Title>> = ({ className, ...props }) => (
  <SheetPrimitive.Title className={cn('font-semibold text-foreground', className)} data-slot="sheet-title" {...props} />
);

export const SheetDescription: FC<ComponentProps<typeof SheetPrimitive.Description>> = ({ className, ...props }) => (
  <SheetPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="sheet-description"
    {...props}
  />
);
