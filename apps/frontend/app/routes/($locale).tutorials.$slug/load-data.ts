// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { BlogPosting, WithContext } from 'schema-dts';
import type { Tutorial, TutorialResponse } from '@repo/api-models';

// common modules
import { fetchTutorial } from '~/api/tutorial';
import { supportedLngs } from '~/config/i18n';
import { addHostnameToPathname, addLocaleToLink, getTutorialRouteLink } from '~/utils/links';
import { getISODate, makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

import {
  failedResponseToResponse,
  getFixedT,
  type GetLoaderData,
  getParamsParam,
  getRequestLocale,
} from '~/utils/loader';

const getTutorialJSONSchema = (tutorial: Tutorial, locale: string): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',

  description: tutorial.short_description || tutorial.seo_description || undefined,
  headline: tutorial.title,
  keywords: tutorial.seo_keywords || undefined,
  url: addHostnameToPathname(getTutorialRouteLink(tutorial, locale)),

  dateCreated: !tutorial.created_at ? undefined : getISODate(tutorial.created_at),
  datePublished: !tutorial.published_at ? undefined : getISODate(tutorial.published_at),
});

export interface TutorialRouteLoaderData {
  tutorialResponse: TutorialResponse;
  seo: SEOMetaParams;
}

export const getTutorialRouteLoaderData: GetLoaderData<TutorialRouteLoaderData> = (
  apiClient,
  _queryClient,
  { params, request },
) =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const t = yield* getFixedT(locale);

    const slug = yield* getParamsParam('slug', params);
    const tutorialResponse = yield* fetchTutorial(apiClient, { locale, slug }).pipe(
      Effect.mapError(failedResponseToResponse),
    );

    const routeUrl = getTutorialRouteLink(tutorialResponse.data, locale);

    return {
      tutorialResponse,

      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: tutorialResponse.data.seo_description,
        jsonSchemas: [getTutorialJSONSchema(tutorialResponse.data, locale)],
        keywords: tutorialResponse.data.seo_keywords,
        title: makePageMetaTitle(
          tutorialResponse.data.seo_title || tutorialResponse.data.title,
          t('META_APP_TITLE'),
        ),

        alternate: R.intersection(supportedLngs, tutorialResponse.data.language_codes)
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(routeUrl, hrefLang),
            hrefLang,
          })),
      },
    };
  });
