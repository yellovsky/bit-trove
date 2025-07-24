import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { type ShortArticlesGetSort, shortArticlesGetSortSchema } from '@repo/api-models';

import { type ApiClient, getApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import type { AppBreadcrumb } from '@features/breadcrumbs';
import { getRequestCookieHeader } from '@features/language-switcher';
import { DEFAULT_SHARDS_SORT, getShardsLink } from '@features/shards';

import { prefetchInfiniteShortShards, type ShortShardsGetVariables } from '@entities/shards';

import type { Route } from '../+types';

type LoadShardsOptions = {
  apiClient: ApiClient;
  queryClient: QueryClient;
  request: Request;
  params: Route.LoaderArgs['params'];
};

const loadShards = async ({ apiClient, queryClient, request, params }: LoadShardsOptions) => {
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

const loadMeta = async (t: TFunction, tShards: TFunction<'shards'>, params: Route.LoaderArgs['params']) => {
  // Breadcrumbs: Home → Shards
  const breadcrumbs: AppBreadcrumb[] = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.shards.title'), to: getShardsLink() },
  ];

  return {
    breadcrumbs,
    canonicalUrl: addClientHost(addLocaleToPathname(getShardsLink(), params.locale)),
    metaDescription: tShards('shards_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tShards('shards_meta_keywords')),
    metaTitle: getMetaTitle(tShards('shards_meta_title'), t('meta_title_suffix')),
  };
};

export const loadShardsRouteData = async (
  t: TFunction,
  tShards: TFunction<'shards'>,
  { params, request }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const [shortShardsLoadResult, metaLoadResult] = await Promise.all([
    loadShards({ apiClient, params, queryClient, request }),
    loadMeta(t, tShards, params),
  ]);

  return {
    ...shortShardsLoadResult,
    ...metaLoadResult,
    dehydratedState: dehydrate(queryClient),
  };
};
