// global modules
import { Effect } from 'effect';
import type { BlogPostResponse, FailedResponse } from '@repo/api-models';

// common modules
import type { ApiClient } from '~/api/api-client';

export const fetchBlogPost = (
  apiClient: ApiClient,
  slug: string,
): Effect.Effect<BlogPostResponse, FailedResponse> =>
  apiClient.get<BlogPostResponse>(`/v1/blog-posts/${slug}`);
