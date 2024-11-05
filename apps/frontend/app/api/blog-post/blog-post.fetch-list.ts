// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, BlogPostListResponse, FailedResponse } from '@repo/api-models';

// common modules
import type { ApiClient } from '~/api/api-client';

export const fetchBlogPostList = (
  apiClient: ApiClient,
  params: BlogPostListFP,
): Effect.Effect<BlogPostListResponse, FailedResponse> =>
  apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, { params });
