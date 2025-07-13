import { dehydrate } from '@tanstack/query-core';

import { isShard } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { prefetchShardQuery, type ShardGetVariables } from '@entities/shards';

import type { Route } from '../+types';

export const loadShardRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const shardVariables: ShardGetVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const shardResponse = await prefetchShardQuery(apiClient, queryClient, shardVariables);
  const shard = shardResponse.data;

  return {
    dehydratedState: dehydrate(queryClient),
    shard,
    shardVariables,
  };
};
