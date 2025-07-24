import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { getQueryClient } from '@shared/lib/query-client';

import { getShardLink } from '@features/shards';

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
  const canonicalUrl = addClientHost(addLocaleToPathname(getShardLink(shard), params.locale));

  return {
    canonicalUrl,
    dehydratedState: dehydrate(queryClient),
    shard,
    shardVariables,
  };
};
