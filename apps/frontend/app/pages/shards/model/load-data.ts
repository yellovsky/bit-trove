import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';
import type { MetaDescriptor } from 'react-router';

import { type ShortArticlesGetSort, shortArticlesGetSortSchema } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';
import { getRequestCookieHeader } from '@features/language-switcher';
import { DEFAULT_SHARDS_SORT, getShardsBreadcrumbs, getShardsLink } from '@features/shards';

import { prefetchInfiniteShortShards, type ShortShardsGetVariables } from '@entities/shards';

import type { Route } from '../+types';

interface LoadDataParams {
  apiClient: ApiClient;
  queryClient: QueryClient;

  // Loader arguments
  loaderArgs: Route.LoaderArgs | Route.ClientLoaderArgs;

  // Translate functions
  t: TFunction;
  tShards: TFunction<'shards'>;
}

/* -------------------------------------------------------------------------------------------------
 * Load short blog posts list
 * -----------------------------------------------------------------------------------------------*/
type LoadShardsParams = LoadDataParams;

const loadShards = async ({ apiClient, queryClient, loaderArgs }: LoadShardsParams) => {
  const { params, request } = loaderArgs;

  // Extract sort parameter from URL and validate it
  const url = new URL(request.url);
  const sortParam = shortArticlesGetSortSchema.safeParse(url.searchParams.get('sort'));
  const validatedSort: ShortArticlesGetSort = sortParam.data || DEFAULT_SHARDS_SORT;

  const shardsVars: ShortShardsGetVariables = {
    locale: params.locale,
    sort: validatedSort,
  };

  const contentLanguages = getRequestCookieHeader(request);
  if (contentLanguages.length) {
    shardsVars.filter = {
      ...shardsVars.filter,
      languageCodeIn: contentLanguages,
    };
  }

  await prefetchInfiniteShortShards(apiClient, queryClient, shardsVars);

  return { shardsVars };
};

/* -------------------------------------------------------------------------------------------------
 * Load meta data
 * -----------------------------------------------------------------------------------------------*/
type LoadMetaParams = LoadDataParams;

const loadMeta = async ({ t, tShards, loaderArgs }: LoadMetaParams) => {
  const { params } = loaderArgs;

  // Breadcrumbs: Home → Shards
  const breadcrumbs = getShardsBreadcrumbs(t);

  // TODO add OG, twitter, json+ld
  const meta: MetaDescriptor[] = [
    { title: getMetaTitle(tShards('shards_meta_title'), t('meta_title_suffix')) },
    {
      content: combineMetaKeywords(t('meta_general_keywords'), tShards('shards_meta_keywords')),
      name: 'keywords',
    },
    { content: tShards('shards_meta_description'), name: 'description' },
    getMetaBreadcrumbs(breadcrumbs, params.locale),
    { href: addClientHost(addLocaleToPathname(getShardsLink(), params.locale)), rel: 'canonical' },
  ];

  return { breadcrumbs, meta };
};

/* -----------------------------------------------------------------------------------------------*/

export const loadShardsRouteData = async (loaderParams: LoadDataParams) =>
  Promise.all([loadShards(loaderParams), loadMeta(loaderParams)])
    .then(([shortShardsLoadResult, metaLoadResult]) => ({ ...shortShardsLoadResult, ...metaLoadResult }))
    .then((data) => ({ ...data, dehydratedState: dehydrate(loaderParams.queryClient) }));
