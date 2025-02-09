// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { Tutorial } from '@repo/api-models';
import type { BlogPosting, WithContext } from 'schema-dts';
import { dehydrate, type DehydratedState } from '@tanstack/react-query';

// common modules
import { supportedLngs } from '~/config/i18n';
import { addHostnameToPathname, addLocaleToLink, getTutorialRouteLink } from '~/utils/links';
import { type FetchTutorialVariables, prefetchTutorialQuery } from '~/api/tutorial';

import {
  getISODate,
  makePageMetaTitle,
  type OGMeta,
  type SEOMetaParams,
  type TwitterMeta,
} from '~/utils/seo';

import {
  getFixedT,
  type GetLoaderData,
  getParamsParam,
  getRequestLocale,
} from '~/utils/loader.server';

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

const getTutorialOGMeta = (tutorial: Tutorial, locale: string): OGMeta | null => {
  const description = tutorial.short_description || tutorial.seo_description;

  return !description || !tutorial.published_at
    ? null
    : {
        description,
        locale,
        published_time: tutorial.published_at,
        title: tutorial.title,
        type: 'article',
        url: addHostnameToPathname(getTutorialRouteLink(tutorial, locale)),
      };
};

const getTutorialTwiiterMeta = (tutorial: Tutorial): TwitterMeta | null => {
  const description = tutorial.short_description || tutorial.seo_description;
  return !description || !tutorial.published_at
    ? null
    : { card: 'summary', description, title: tutorial.title };
};

export interface TutorialRouteLoaderData {
  tutorialVariables: FetchTutorialVariables;
  seo: SEOMetaParams;
  dehydratedState: DehydratedState;
}

export const getTutorialRouteLoaderData: GetLoaderData<TutorialRouteLoaderData> = (
  apiClient,
  queryClient,
  { params, request },
) =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const t = yield* getFixedT(locale);

    const slug = yield* getParamsParam('slug', params);
    const tutorialVariables: FetchTutorialVariables = { locale, slug };

    const tutorialResponse = yield* prefetchTutorialQuery(
      apiClient,
      queryClient,
      tutorialVariables,
    );

    const routeUrl = getTutorialRouteLink(tutorialResponse.data, locale);

    return {
      dehydratedState: dehydrate(queryClient),
      tutorialVariables,

      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: tutorialResponse.data.seo_description,
        jsonSchemas: [getTutorialJSONSchema(tutorialResponse.data, locale)],
        keywords: tutorialResponse.data.seo_keywords,
        og: getTutorialOGMeta(tutorialResponse.data, locale),
        twitter: getTutorialTwiiterMeta(tutorialResponse.data),

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
