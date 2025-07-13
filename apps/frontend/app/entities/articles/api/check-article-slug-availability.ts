import type { ArticleSlugAvailabilityResponse } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';

export const checkArticleSlugAvailability =
  (apiClient: ApiClient) =>
  async (slug: string): Promise<ArticleSlugAvailabilityResponse> =>
    apiClient.get<ArticleSlugAvailabilityResponse>(`/v1/articles/check-slug-availability/${slug}`, {
      withCredentials: true,
    });
