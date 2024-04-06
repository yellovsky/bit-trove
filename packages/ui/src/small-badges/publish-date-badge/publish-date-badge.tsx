// global modules
import type { FC } from 'react';
import { Icon } from '@bit-trove/ui/icon';
import { useTranslations } from 'next-intl';
import { SmallBadge } from '@bit-trove/ui/small-badge';

// local modules
import { holder as holderCn } from './views-badge.module.scss';

export const PublishDateBadge: FC<{ date: number | string | Date }> = ({ date }) => {
  const t = useTranslations();

  return (
    <SmallBadge narrow iconSize="big" className={holderCn} icon={<Icon type="clock" />}>
      {t('published on {date}', { date: new Date(date) })}
    </SmallBadge>
  );
};
