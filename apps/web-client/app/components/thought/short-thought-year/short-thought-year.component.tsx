// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// local modules
import { year as yearCn } from './short-thought-year.module.scss';

interface ShortThoughtYearProps {
  year: number;
}

export const ShortThoughtYear: FC<ShortThoughtYearProps> = ({ year }) => {
  const { i18n } = useTranslation();

  const formattedMonth = i18n.t('{{val, datetime}}', {
    formatParams: { val: { year: 'numeric' } },
    val: new Date(year),
  });

  return (
    <div>
      <div className={yearCn}>{formattedMonth}</div>
    </div>
  );
};
