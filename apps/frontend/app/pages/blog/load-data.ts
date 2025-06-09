import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetManyBlogPostsVariables, prefetchManyBlogPostsQuery } from '@entities/blog-posts';

import type { Route } from './+types';

export const loadBlogPostsRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const blogPostsVars: GetManyBlogPostsVariables = {
    locale: params.locale,
    sort: '-createdAt',
  };

  await prefetchManyBlogPostsQuery(apiClient, queryClient, blogPostsVars);

  return { blogPostsVars, dehydratedState: dehydrate(queryClient) };
};
