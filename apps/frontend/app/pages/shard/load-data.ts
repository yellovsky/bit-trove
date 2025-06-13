import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetOneShardVariables, prefetchOneShardQuery } from '@entities/shards';

import type { Route } from './+types';

export const loadShardRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
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
    shard,
  };
};
