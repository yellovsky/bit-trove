// global modules
import { Effect } from 'effect';
import type { GuideItemResponse } from '@repo/api-models';
import type { LoaderFunctionArgs } from '@remix-run/node';

// common modules
import type { ApiClient } from '~/api/api-client';
import { fetchGuide } from '~/api/guide';
import { failedResponseToResponse, getParamsParam, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  guideResponse: GuideItemResponse;

  pageSEOTitle: string;
  pageSEODescription: string | null;
  pageSEOKeywords: string | null;
}

export const loadGuideRouteData = (
  apiClient: ApiClient,
  { params, request }: LoaderFunctionArgs,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const slug = yield* getParamsParam('slug', params);
    const guideResponse = yield* fetchGuide(apiClient, { locale, slug }).pipe(
      Effect.mapError(failedResponseToResponse),
    );

    return {
      guideResponse,
      pageSEODescription: guideResponse.data.seo_description,
      pageSEOKeywords: guideResponse.data.seo_keywords,
      pageSEOTitle: guideResponse.data.seo_title || guideResponse.data.title,
    };
  });
