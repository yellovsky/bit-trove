// global modules
import { Effect } from 'effect';
import type { FailedResponse, GuideItemResponse } from '@repo/api-models';

// common modules
import type { ApiClient } from '~/api/api-client';

export interface FetchGuideFP {
  locale: string;
  slug: string;
}

export const fetchGuide = (
  apiClient: ApiClient,
  { slug, locale }: FetchGuideFP,
): Effect.Effect<GuideItemResponse, FailedResponse> =>
  apiClient.get<GuideItemResponse>(`/v1/guides/${slug}`, { params: { locale } });
