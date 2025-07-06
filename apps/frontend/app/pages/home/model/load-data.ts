import { dehydrate } from '@tanstack/react-query';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { getGlobal } from '@shared/lib/get-global';
import { getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetManyBlogPostsVariables, prefetchManyBlogPostsQuery } from '@entities/blog-posts';
import { type GetManyShardsVariables, prefetchInfiniteShardsQuery } from '@entities/shards';

import type { Route } from '../+types';

export const loadHomeRouteData = async (t: TFunction, { params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const shardsVariables: GetManyShardsVariables = {
    locale: params.locale,
    sort: '-createdAt',
  };
  await prefetchInfiniteShardsQuery(apiClient, queryClient, shardsVariables);

  const blogPostsVariables: GetManyBlogPostsVariables = {
    locale: params.locale,
    sort: '-createdAt',
  };
  await prefetchManyBlogPostsQuery(apiClient, queryClient, blogPostsVariables);

  return {
    blogPostsVariables,
    canonicalUrl: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    dehydratedState: dehydrate(queryClient),
    metaDescription: t('meta_general_description'),
    metaKeywords: t('meta_general_keywords'),
    metaTitle: getMetaTitle('', t('meta_title_suffix')),
    shardsVariables,
  };
};
