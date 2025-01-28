// global modules
import type { BlogPostListFP } from '@repo/api-models';
import { Effect } from 'effect';
import type { Params } from '@remix-run/react';
import { dehydrate, type DehydratedState, type QueryClient } from '@tanstack/react-query';

// common modules
import type { ApiClient } from '~/api/api-client';
import { getParamsParam } from '~/utils/loader';
import { initialPageParam } from '~/api/pagination';
import { prefetchBlogPostListQuery } from '~/api/blog-post';

export interface LoaderData {
  blogPostFP: BlogPostListFP;
  dehydratedState: DehydratedState;
}

export const loadBlogRouteData = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  params: Params,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getParamsParam('locale', params);

    const blogPostFP: BlogPostListFP = {
      locale,
      page: initialPageParam,
      sort: '-created_at',
    };
    yield* prefetchBlogPostListQuery(apiClient, queryClient, blogPostFP);

    return { blogPostFP, dehydratedState: dehydrate(queryClient) };
  });
