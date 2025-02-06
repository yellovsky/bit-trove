// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { GuideItemResponse } from '@repo/api-models';
import type { LoaderFunctionArgs } from '@remix-run/node';

// common modules
import type { ApiClient } from '~/api/api-client';
import { fetchGuide } from '~/api/guide';
import type { SEOMetaParams } from '~/utils/seo';
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getGuideRouteLink } from '~/utils/links';
import { failedResponseToResponse, getParamsParam, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  guideResponse: GuideItemResponse;

  seo: SEOMetaParams;
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

    const routeUrl = getGuideRouteLink(guideResponse.data);

    return {
      guideResponse,

      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: guideResponse.data.seo_description,
        keywords: guideResponse.data.seo_keywords,
        title: guideResponse.data.seo_title || guideResponse.data.title,

        alternate: R.intersection(supportedLngs, guideResponse.data.language_codes)
          .filter(lang => lang !== locale)
          .map(hreflang => ({
            href: addLocaleToLink(routeUrl, hreflang),
            hreflang,
          })),
      },
    };
  });
