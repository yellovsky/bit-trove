// global modules
import type { FC } from 'react';
import { useFormatter } from 'next-intl';

// local modules
import { month as monthCn } from './short-thought-month.module.scss';
import { ShortThoughtLineContent } from '../short-thought-line-content';

interface ShortThoughtMonthProps {
  month: number;
}

export const ShortThoughtMonth: FC<ShortThoughtMonthProps> = ({ month }) => {
  return null;
  // const formatter = useFormatter();

  // return (
  //   <>
  //     <ShortThoughtLineContent position="bottom" />
  //     <div className={monthCn}>{formatter.dateTime(new Date(0, month), { month: 'long' })}</div>
  //     <br />
  //   </>
  // );
};
