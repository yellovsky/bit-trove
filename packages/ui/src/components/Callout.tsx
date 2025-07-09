import { AlertOctagon, AlertTriangle, CheckCircle, Code, HelpCircle, Info, Lightbulb } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@repo/ui/lib/utils';

export type CalloutType = 'info' | 'question' | 'warning' | 'danger' | 'code' | 'success' | 'recommendation';

export const calloutIcons = {
  code: Code,
  danger: AlertOctagon,
  info: Info,
  question: HelpCircle,
  recommendation: Lightbulb,
  success: CheckCircle,
  warning: AlertTriangle,
} as const;

/* -------------------------------------------------------------------------------------------------
 * Callout
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Callout';

type CalloutProps = ComponentProps<'div'>;

const Callout: FC<CalloutProps> = ({ className, ...rest }) => <div className={cn('callout', className)} {...rest} />;

Callout.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutTitle
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_TITLE_NAME = 'CalloutTitle';

interface CalloutTitleProps extends ComponentProps<'div'> {
  type: CalloutType;
  children: ReactNode;
}

const CalloutTitle: FC<CalloutTitleProps> = ({ type, children, className, ...rest }) => {
  const IconComponent = calloutIcons[type];

  return (
    <div className={cn('callout-header', className)} data-callout-type={type} {...rest}>
      <div className="callout-icon">
        <IconComponent />
      </div>
      <div className="flex-1">
        <span className="callout-title">{children}</span>
      </div>
    </div>
  );
};

CalloutTitle.displayName = CALLOUT_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutContent
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_CONTENT_NAME = 'CalloutContent';

type CalloutContentProps = ComponentProps<'div'>;

const CalloutContent: FC<CalloutContentProps> = ({ className, ...rest }) => (
  <div className={cn('callout-content', className)} {...rest} />
);

CalloutContent.displayName = CALLOUT_CONTENT_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Callout;
const Content = CalloutContent;
const Title = CalloutTitle;

export {
  Root,
  Content,
  Title,
  //
  Callout,
  CalloutContent,
  CalloutTitle,
};

export type { CalloutContentProps, CalloutProps, CalloutTitleProps };
