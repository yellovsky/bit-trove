import type { MutationFunction } from '@tanstack/react-query';

import type { ThoughtSlugAvailabilityResponse } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';

export const checkThoughtSlugAvailability =
  (apiClient: ApiClient): MutationFunction<ThoughtSlugAvailabilityResponse, string> =>
  (slug) =>
    apiClient.get<ThoughtSlugAvailabilityResponse>(`/v1/thought-slug-availability/${slug}`, {
      withCredentials: true,
    });
