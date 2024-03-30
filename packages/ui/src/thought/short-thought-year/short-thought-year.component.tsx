// global modules
import type { FC } from 'react';
import { useFormatter } from 'use-intl';

// local modules
import { year as yearCn } from './short-thought-year.module.scss';

interface ShortThoughtYearProps {
  year: number;
}

export const ShortThoughtYear: FC<ShortThoughtYearProps> = ({ year }) => {
  const formatter = useFormatter();

  return (
    <div>
      <div className={yearCn}>{formatter.dateTime(new Date(year), { year: 'numeric' })}</div>
    </div>
  );
};
