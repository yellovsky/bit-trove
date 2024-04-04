// global modules
import type { FC } from 'react';
import { Title } from '@bit-trove/ui/title';
import { useTranslations } from 'next-intl';

// local modules
import { noResult as noResultCn } from './no-result.module.scss';

export const NoResult: FC = () => {
  const t = useTranslations();

  return (
    <Title as="div" className={noResultCn} styledAs="h2">
      {t('no_results')}
    </Title>
  );
};
