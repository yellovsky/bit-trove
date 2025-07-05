import type { BlogPostSlugAvailabilityResponse } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';

export const checkBlogPostSlugAvailability =
  (apiClient: ApiClient) =>
  async (slug: string): Promise<BlogPostSlugAvailabilityResponse> => {
    return apiClient.get<BlogPostSlugAvailabilityResponse>(`/v1/blog-posts/check-slug-availability/${slug}`);
  };
