import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetOneBlogPostVariables, prefetchOneBlogPostQuery } from '@entities/blog-posts';

import type { Route } from './+types';

export const loadBlogPostRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const getOneBlogPostVars: GetOneBlogPostVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const blogPostResponse = await prefetchOneBlogPostQuery(apiClient, queryClient, getOneBlogPostVars);

  const blogPost = blogPostResponse.data;

  return {
    blogPost,
    dehydratedState: dehydrate(queryClient),
    getOneBlogPostVars,
    ids: ['test', 'test-2'],
  };
};
