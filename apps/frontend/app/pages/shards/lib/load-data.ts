import { dehydrate } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import type { AppBreadcrumb } from '@features/breadcrumbs';
import { getShardsLink } from '@features/shards';

import { type GetManyShardsVariables, prefetchInfiniteShardsQuery } from '@entities/shards';

import type { Route } from '../+types';

// Valid sort values for shards
const VALID_SORT_VALUES = ['title', '-title', 'createdAt', '-createdAt', 'publishedAt', '-publishedAt'] as const;
type ValidSortValue = (typeof VALID_SORT_VALUES)[number];

const isValidSortValue = (value: string): value is ValidSortValue => {
  return VALID_SORT_VALUES.includes(value as ValidSortValue);
};

export const loadShardsRouteData = async (
  t: TFunction,
  tShards: TFunction<'shards'>,
  { params, request }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  // Extract sort parameter from URL and validate it
  const url = new URL(request.url);
  const sortParam = url.searchParams.get('sort') || '-createdAt';
  const validatedSort = isValidSortValue(sortParam) ? sortParam : '-createdAt';

  const shardsVariables: GetManyShardsVariables = {
    locale: params.locale,
    sort: validatedSort,
  };
  await prefetchInfiniteShardsQuery(apiClient, queryClient, shardsVariables);

  const breadcrumbs: AppBreadcrumb[] = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.shards.title'), to: getShardsLink() },
  ];

  return {
    breadcrumbs,
    dehydratedState: dehydrate(queryClient),
    metaDescription: tShards('shards_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tShards('shards_meta_keywords')),
    metaTitle: getMetaTitle(tShards('shards_meta_title'), t('meta_title_suffix')),
    shardsVariables,
  };
};
