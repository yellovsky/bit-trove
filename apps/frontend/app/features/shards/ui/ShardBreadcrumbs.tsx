import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { Shard } from '@repo/api-models';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { getShardLink, getShardsLink } from '../lib/links';

/* -------------------------------------------------------------------------------------------------
 * ShardBreadcrumbs
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ShardBreadcrumbs';

interface ShardBreadcrumbsProps {
  shard: Shard;
  className?: string;
}

const ShardBreadcrumbs: FC<ShardBreadcrumbsProps> = ({ shard, className }) => {
  const { t } = useTranslation();

  const breadcrumbs: AppBreadcrumb[] = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.shards.title'), to: getShardsLink() },
    { label: shard.title, to: getShardLink(shard) },
  ];

  return <Breadcrumbs className={className} items={breadcrumbs} />;
};

ShardBreadcrumbs.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShardBreadcrumbs };

export type { ShardBreadcrumbsProps };
