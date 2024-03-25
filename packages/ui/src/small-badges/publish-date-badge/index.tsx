// global modules
import { useMemo, type FC, useTransition } from 'react';
import { SmallBadge } from '@repo/ui/small-badge';

// local modules
import { useFormatter, useTranslations } from 'next-intl';
import { holder as holderCn, icon as iconCn } from './views-badge.module.scss';

export const PublishDateBadge: FC<{ date: number | string | Date }> = ({ date }) => {
  const format = useFormatter();
  const t = useTranslations();

  const dateTime = useMemo(() => new Date(date), [date]);

  return (
    <SmallBadge narrow className={holderCn} icon={<div className={iconCn} />}>
      {t('published on {date}', { date: new Date(date) })}
    </SmallBadge>
  );
};
