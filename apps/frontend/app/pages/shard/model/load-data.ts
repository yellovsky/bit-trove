import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';
import type { MetaDescriptor } from 'react-router';

import type { Shard } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';
import {
  getShardBreadcrumbs,
  getShardJsonJdMeta,
  getShardLink,
  getShardOgMeta,
  getShardTwitterMeta,
} from '@features/shards';

import { prefetchShardQuery, type ShardGetVariables } from '@entities/shards';

import type { Route } from '../+types';

interface LoadDataParams {
  apiClient: ApiClient;
  queryClient: QueryClient;

  // Loader arguments
  loaderArgs: Route.LoaderArgs | Route.ClientLoaderArgs;

  // Translate functions
  t: TFunction;
}

/* -------------------------------------------------------------------------------------------------
 * Load shard
 * -----------------------------------------------------------------------------------------------*/
type LoadShardParams = LoadDataParams;

const loadShard = async ({ apiClient, queryClient, loaderArgs }: LoadShardParams) => {
  const { params } = loaderArgs;

  const getOneShardVars: ShardGetVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const shardResponse = await prefetchShardQuery(apiClient, queryClient, getOneShardVars);

  return { getOneShardVars, shard: shardResponse.data };
};

/* -------------------------------------------------------------------------------------------------
 * Load meta data
 * -----------------------------------------------------------------------------------------------*/
type LoadMetaParams = LoadDataParams & { shard: Shard };

const loadMeta = async ({ t, loaderArgs, shard }: LoadMetaParams) => {
  const { params } = loaderArgs;

  const breadcrumbs = getShardBreadcrumbs(t, shard);

  const meta: MetaDescriptor[] = [
    // Basic meta tags
    { title: shard.seo?.title || shard.title },
    { content: shard.seo?.keywords || '', name: 'keywords' },
    { content: shard.seo?.description || shard.shortDescription || '', name: 'description' },

    // Open Graph meta tags
    ...getShardOgMeta(shard),

    // Twitter Card meta tags
    ...getShardTwitterMeta(shard),

    // JSON-LD structured data
    getShardJsonJdMeta(shard),

    // Canonical URL
    { href: addClientHost(addLocaleToPathname(getShardLink(shard), params.locale)), rel: 'canonical' },

    // breadcrumbs
    getMetaBreadcrumbs(breadcrumbs, params.locale),
  ];

  return { breadcrumbs, meta };
};

export const loadShardRouteData = async (loaderParams: LoadDataParams) => {
  const loadShardResult = await loadShard(loaderParams);
  const loadMetaResult = await loadMeta({ ...loaderParams, ...loadShardResult });

  return {
    ...loadMetaResult,
    ...loadShardResult,
    dehydratedState: dehydrate(loaderParams.queryClient),
  };
};
