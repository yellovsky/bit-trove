import type { MutationFunction } from '@tanstack/react-query';

import type { ShardSlugAvailabilityResponse } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';

export const checkShardSlugAvailability =
  (apiClient: ApiClient): MutationFunction<ShardSlugAvailabilityResponse, string> =>
  (slug) =>
    apiClient.get<ShardSlugAvailabilityResponse>(`/v1/cms-shards/check-slug-availability/${slug}`, {
      withCredentials: true,
    });
