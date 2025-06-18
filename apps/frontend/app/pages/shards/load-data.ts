import { dehydrate } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetManyShardsVariables, prefetchInfiniteShardsQuery } from '@entities/shards';

import type { Route } from './+types';

export const loadShardsRouteData = async (
  t: TFunction,
  tShards: TFunction<'shards'>,
  { params }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const shardsVariables: GetManyShardsVariables = {
    locale: params.locale,
    sort: 'createdAt',
  };
  await prefetchInfiniteShardsQuery(apiClient, queryClient, shardsVariables);

  return {
    dehydratedState: dehydrate(queryClient),
    metaDescription: tShards('shards_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tShards('shards_meta_keywords')),
    metaTitle: getMetaTitle(tShards('shards_meta_title'), t('meta_title_suffix')),
    shardsVariables,
  };
};
