// global modules
import type { FC } from 'react';
import { Tag } from '@repo/ui/tag';
import { useTranslation } from 'react-i18next';

// local modules
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
      <Tag colorScheme="gray" size="lg" variant="outline">
        {formattedMonth}
      </Tag>
      <br />
    </>
  );
};
