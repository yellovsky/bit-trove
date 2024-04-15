// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// local modules
import { month as monthCn } from './short-thought-month.module.scss';
import { ShortThoughtLineContent } from '../short-thought-line-content';

interface ShortThoughtMonthProps {
  month: number;
}

export const ShortThoughtMonth: FC<ShortThoughtMonthProps> = ({ month }) => {
  const { i18n } = useTranslation();

  const formattedMonth = i18n.t('{{val, datetime}}', {
    formatParams: { val: { month: 'long' } },
    val: new Date(0, month),
  });

  return (
    <>
      <ShortThoughtLineContent position="bottom" />
      <div className={monthCn}>{formattedMonth}</div>
      <br />
    </>
  );
};
