// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { GuideItemResponse } from '@repo/api-models';

// common modules
import { fetchGuide } from '~/api/guide';
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getGuideRouteLink } from '~/utils/links';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

import {
  failedResponseToResponse,
  getFixedT,
  type GetLoaderData,
  getParamsParam,
  getRequestLocale,
} from '~/utils/loader';

export interface LoaderData {
  guideResponse: GuideItemResponse;

  seo: SEOMetaParams;
}

export const getGuideLoaderData: GetLoaderData<LoaderData> = (
  apiClient,
  _queryClient,
  { params, request },
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const t = yield* getFixedT(locale);

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
        title: makePageMetaTitle(
          guideResponse.data.seo_title || guideResponse.data.title,
          t('META_APP_TITLE'),
        ),

        alternate: R.intersection(supportedLngs, guideResponse.data.language_codes)
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(routeUrl, hrefLang),
            hrefLang,
          })),
      },
    };
  });
