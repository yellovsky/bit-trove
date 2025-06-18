import { dehydrate } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetOneShardVariables, prefetchOneShardQuery } from '@entities/shards';

import type { Route } from './+types';

export const loadShardRouteData = async (t: TFunction, { params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const getOneShardVars: GetOneShardVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const shardResponse = await prefetchOneShardQuery(apiClient, queryClient, getOneShardVars);
  const shard = shardResponse.data;

  return {
    dehydratedState: dehydrate(queryClient),
    getOneShardVars,
    metaDescription: shard.seo?.description,
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), shard.seo?.keywords ?? ''),
    metaTitle: getMetaTitle(shard.seo?.title ?? shard?.title, t('meta_title_suffix')),
    shard,
  };
};
