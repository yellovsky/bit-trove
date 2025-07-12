import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Dialog';

const Dialog: FC<DialogPrimitive.DialogProps> = (props) => <DialogPrimitive.Root data-slot="dialog" {...props} />;

Dialog.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_TRIGGER_NAME = 'DialogTrigger';

const DialogTrigger: FC<DialogPrimitive.DialogTriggerProps> = (props) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

DialogTrigger.displayName = DIALOG_TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogPortal
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_PORTAL_NAME = 'DialogPortal';

const DialogPortal: FC<DialogPrimitive.DialogPortalProps> = (props) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

DialogPortal.displayName = DIALOG_PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogClose
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_CLOSE_NAME = 'DialogClose';

const DialogClose: FC<DialogPrimitive.DialogCloseProps> = (props) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

DialogClose.displayName = DIALOG_CLOSE_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogOverlay
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_OVERLAY_NAME = 'DialogOverlay';

const DialogOverlay: FC<DialogPrimitive.DialogOverlayProps> = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    data-slot="dialog-overlay"
    {...props}
  />
);

DialogOverlay.displayName = DIALOG_OVERLAY_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogContent
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_CONTENT_NAME = 'DialogContent';

type DialogContentProps = DialogPrimitive.DialogContentProps & {
  showCloseButton?: boolean;
};

const DialogContent: FC<DialogContentProps> = ({ className, children, showCloseButton = true, ...props }) => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
        className
      )}
      data-slot="dialog-content"
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
          data-slot="dialog-close"
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

DialogContent.displayName = DIALOG_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogHeader
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_HEADER_NAME = 'DialogHeader';

type DialogHeaderProps = ComponentProps<'div'>;

const DialogHeader: FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} data-slot="dialog-header" {...props} />
);

DialogHeader.displayName = DIALOG_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogFooter
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_FOOTER_NAME = 'DialogFooter';

type DialogFooterProps = ComponentProps<'div'>;

const DialogFooter: FC<DialogFooterProps> = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    data-slot="dialog-footer"
    {...props}
  />
);

DialogFooter.displayName = DIALOG_FOOTER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogTitle
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_TITLE_NAME = 'DialogTitle';

const DialogTitle: FC<DialogPrimitive.DialogTitleProps> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    className={cn('font-semibold text-lg leading-none', className)}
    data-slot="dialog-title"
    {...props}
  />
);

DialogTitle.displayName = DIALOG_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogDescription
 * -----------------------------------------------------------------------------------------------*/
const DIALOG_DESCRIPTION_NAME = 'DialogDescription';

const DialogDescription: FC<DialogPrimitive.DialogDescriptionProps> = ({ className, ...props }) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-slot="dialog-description"
    {...props}
  />
);

DialogDescription.displayName = DIALOG_DESCRIPTION_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Dialog;
const Close = DialogClose;
const Content = DialogContent;
const Description = DialogDescription;
const Footer = DialogFooter;
const Header = DialogHeader;
const Overlay = DialogOverlay;
const Portal = DialogPortal;
const Title = DialogTitle;
const Trigger = DialogTrigger;

export {
  Root,
  Close,
  Content,
  Description,
  Footer,
  Header,
  Overlay,
  Portal,
  Title,
  Trigger,
  //
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

export type { DialogContentProps, DialogHeaderProps, DialogFooterProps };

export type {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@radix-ui/react-dialog';
