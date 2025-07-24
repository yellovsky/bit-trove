import type { TFunction } from 'i18next';

import type { Shard } from '@repo/api-models';

import type { AppBreadcrumb } from '@features/breadcrumbs';
import { getShardLink, getShardsLink } from '@features/shards';

// Breadcrumbs: Home → Shards
export const getShardsBreadcrumbs = (t: TFunction): AppBreadcrumb[] => [
  { label: t('menu_items.home.title'), to: '/' },
  { label: t('menu_items.shards.title'), to: getShardsLink() },
];

// Breadcrumbs: Home → Shards → Shard
export const getShardBreadcrumbs = (t: TFunction, shard: Shard): AppBreadcrumb[] => [
  ...getShardsBreadcrumbs(t),
  { label: shard.title, to: getShardLink(shard) },
];
