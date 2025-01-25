// global modules
import type { BlogPostListResponse } from '@repo/api-models';
import { Effect } from 'effect';
import type { Params } from '@remix-run/react';

// common modules
import type { ApiClient } from '~/api/api-client';
import { fetchBlogPostList } from '~/api/blog-post';
import { failedResponseToResponse, getParamsParam } from '~/utils/loader';

export interface LoaderData {
  blogPostListResponse: BlogPostListResponse;
}

export const loadBlogRouteData = (
  apiClient: ApiClient,
  params: Params,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getParamsParam('locale', params);

    const blogPostListResponse = yield* fetchBlogPostList(apiClient, {
      locale,
      page: { limit: 10, offset: 0 },
      sort: 'created_at',
    }).pipe(Effect.mapError(failedResponseToResponse));

    return { blogPostListResponse };
  });
