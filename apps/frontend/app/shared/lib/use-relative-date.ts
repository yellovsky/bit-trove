import { differenceInDays } from 'date-fns';
import { useTranslation } from 'react-i18next';

export const useRelativeDate = (date: Date | string) => {
  const { i18n } = useTranslation();
  const dateToHandle = new Date(date);
  const dayDiff = differenceInDays(dateToHandle, new Date());
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

  return Math.abs(dayDiff) < 7 ? rtf.format(dayDiff, 'day') : dateFormatter.format(dateToHandle);
};
