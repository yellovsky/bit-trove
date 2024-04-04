// global modules
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import { holder as holderCn, icon as iconCn } from './views-badge.module.scss';

export const PublishDateBadge: FC<{ date: number | string | Date }> = ({ date }) => {
  const t = useTranslations();

  return (
    <SmallBadge narrow className={holderCn} icon={<div className={iconCn} />}>
      {t('published on {date}', { date: new Date(date) })}
    </SmallBadge>
  );
};
