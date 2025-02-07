// global modules
import { Effect } from 'effect';
import type { FailedResponse, TutorialResponse } from '@repo/api-models';

// common modules
import type { ApiClient } from '~/api/api-client';

export interface FetchTutorialFP {
  locale: string;
  slug: string;
}

export const fetchTutorial = (
  apiClient: ApiClient,
  { slug, locale }: FetchTutorialFP,
): Effect.Effect<TutorialResponse, FailedResponse> =>
  apiClient.get<TutorialResponse>(`/v1/tutorials/${slug}`, { params: { locale } });
