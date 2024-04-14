// global modules
import type { FC } from 'react';
import { Title } from '@repo/ui/title';

// local modules
import { noResult as noResultCn } from './no-result.module.scss';

export const NoResult: FC = () => {
  // const t = useTranslations();

  return (
    <Title as="div" className={noResultCn} styledAs="h2">
      t('no_results')
    </Title>
  );
};
