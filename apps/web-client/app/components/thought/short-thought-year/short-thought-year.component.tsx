// global modules
import type { FC } from 'react';
import { Tag } from '@repo/ui/tag';
import { useTranslation } from 'react-i18next';

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
    <Tag colorScheme="gray" size="lg" variant="filled">
      {formattedMonth}
    </Tag>
  );
};
