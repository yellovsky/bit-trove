import { CalendarIcon, ClockIcon, type LucideIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * LabeledIcon
 * -----------------------------------------------------------------------------------------------*/
const LABEL_ICON_NAME = 'LabelIcon';

interface LabeledIconProps extends ComponentProps<'div'> {
  icon: LucideIcon;
}

const LabeledIcon: FC<LabeledIconProps> = ({ icon: Icon, className, children, ...rest }) => (
  <div {...rest} className={cn('flex flex-nowrap items-center gap-1 text-muted-foreground text-sm', className)}>
    <Icon className="size-4" strokeWidth={1.5} />
    {children}
  </div>
);

LabeledIcon.displayName = LABEL_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * ReadingTimeLabelIcon
 * -----------------------------------------------------------------------------------------------*/
const READING_TIME_LABEL_ICON_NAME = 'ReadingTimeLabelIcon';

interface ReadingTimeLabelIconProps extends Omit<LabeledIconProps, 'icon'> {
  minutes: number;
}

const ReadingTimeLabelIcon: FC<ReadingTimeLabelIconProps> = ({ minutes, className, ...rest }) => {
  const { t } = useTranslation();

  return (
    <LabeledIcon {...rest} icon={ClockIcon}>
      {t('{{number}} min read', { number: minutes })}
    </LabeledIcon>
  );
};

ReadingTimeLabelIcon.displayName = READING_TIME_LABEL_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * DateLabelIcon
 * -----------------------------------------------------------------------------------------------*/
const DATE_LABEL_ICON_NAME = 'DateLabelIcon';

interface DateLabelIconProps extends Omit<LabeledIconProps, 'icon'> {
  date: string | Date;
}

const DateLabelIcon: FC<DateLabelIconProps> = ({ date, className, ...rest }) => {
  const { i18n } = useTranslation();
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });

  return (
    <LabeledIcon {...rest} icon={CalendarIcon}>
      {dateFormatter.format(new Date(date))}
    </LabeledIcon>
  );
};

DateLabelIcon.displayName = DATE_LABEL_ICON_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { DateLabelIcon, LabeledIcon, ReadingTimeLabelIcon };

export type { DateLabelIconProps, LabeledIconProps, ReadingTimeLabelIconProps };
