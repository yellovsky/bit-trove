// global modules
import type { FC } from 'react';
import { Icon } from '@bit-trove/ui/icon';
import { SmallBadge } from '@bit-trove/ui/small-badge';
import { useTranslations } from 'next-intl';

// local modules
import { holder as holderCn } from './views-badge.module.scss';

export const PublishDateBadge: FC<{ date: number | string | Date }> = ({ date }) => {
  const t = useTranslations();

  return (
    <SmallBadge narrow className={holderCn} icon={<Icon type="clock" />} iconSize="big">
      {t('published on {date}', { date: new Date(date) })}
    </SmallBadge>
  );
};
