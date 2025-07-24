import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { getQueryClient } from '@shared/lib/query-client';

import { getBlogPostLink } from '@features/blog-posts';

import { type BlogPostGetVariables, prefetchBlogPostQuery } from '@entities/blog-posts';

import type { Route } from '../+types';

export const loadBlogPostRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const getOneBlogPostVars: BlogPostGetVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const blogPostResponse = await prefetchBlogPostQuery(apiClient, queryClient, getOneBlogPostVars);

  const blogPost = blogPostResponse.data;
  const canonicalUrl = addClientHost(addLocaleToPathname(getBlogPostLink(blogPostResponse.data), params.locale));

  return {
    blogPost,
    canonicalUrl,
    dehydratedState: dehydrate(queryClient),
    getOneBlogPostVars,
    ids: ['test', 'test-2'],
  };
};
