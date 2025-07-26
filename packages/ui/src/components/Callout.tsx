import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CodeIcon,
  HelpCircleIcon,
  InfoIcon,
  LightbulbIcon,
} from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const CALLOUT_TYPES = ['info', 'question', 'warning', 'danger', 'code', 'success', 'recommendation'] as const;
export type CalloutType = (typeof CALLOUT_TYPES)[number];
const isCalloutType = (type: string): type is CalloutType => CALLOUT_TYPES.includes(type as CalloutType);

export const getCalloutIconByType = (type: string) => {
  switch (type) {
    case 'code':
      return CodeIcon;

    case 'danger':
      return AlertOctagonIcon;

    case 'info':
      return InfoIcon;

    case 'question':
      return HelpCircleIcon;

    case 'recommendation':
      return LightbulbIcon;

    case 'success':
      return CheckCircleIcon;

    case 'warning':
      return AlertTriangleIcon;

    default:
      return InfoIcon;
  }
};

export const getCalloutPaletteByType = (type: string): Palette => {
  switch (type) {
    case 'code':
      return 'gray';

    case 'danger':
      return 'red';

    case 'info':
      return 'brand';

    case 'question':
      return 'gray';

    case 'recommendation':
      return 'teal';

    case 'success':
      return 'green';

    case 'warning':
      return 'amber';

    default:
      return 'brand';
  }
};

/* -------------------------------------------------------------------------------------------------
 * Callout
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Callout';

const calloutVariants = cva(
  'grid items-start justify-start gap-x-3 gap-y-2 rounded-lg p-4 text-left text-primary-a11',
  {
    defaultVariants: {
      variant: 'soft',
    },
    variants: {
      variant: {
        outline: 'inset-ring inset-ring-primary-a7',
        soft: 'bg-primary-a3 dark:bg-primary-a4/30',
        surface: 'inset-ring inset-ring-primary-a6 bg-primary-a2',
      },
    },
  }
);

type CalloutProps = ComponentProps<'div'> &
  VariantProps<typeof calloutVariants> & { asChild?: boolean; icon?: ReactNode };

const Callout: FC<CalloutProps> = ({ className, variant, children, asChild, icon, ...rest }) => {
  const propsType = 'data-callout-type' in rest ? rest['data-callout-type'] : 'info';
  const calloutType = typeof propsType === 'string' && isCalloutType(propsType) ? propsType : 'info';
  const IconComponent = getCalloutIconByType(calloutType);
  const palette = getCalloutPaletteByType(calloutType);

  return (
    <div className={cn(calloutVariants({ variant }), getPaletteClassName(palette), className)} {...rest}>
      <div className="-col-start-2 flex h-6 w-4 items-center">{icon ?? <IconComponent />}</div>
      <div className="-col-start-1">{children}</div>
    </div>
  );
};

Callout.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutTitle
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_TITLE_NAME = 'CalloutTitle';

type CalloutTitleProps = ComponentProps<'div'>;

const CalloutTitle: FC<CalloutTitleProps> = ({ className, ...rest }) =>
  rest.children ? <div className={cn('mb-3 font-bold uppercase', className)} {...rest} /> : null;

CalloutTitle.displayName = CALLOUT_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CalloutContent
 * -----------------------------------------------------------------------------------------------*/
const CALLOUT_CONTENT_NAME = 'CalloutContent';

type CalloutContentProps = ComponentProps<'div'>;

const CalloutContent: FC<CalloutContentProps> = (props) => <div {...props} />;

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
