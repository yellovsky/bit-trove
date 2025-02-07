// global modules
import { Effect } from 'effect';

// common modules
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getTutorialsRouteLink } from '~/utils/links';
import { getFixedT, type GetLoaderData, getRequestLocale } from '~/utils/loader';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

export interface TutorialsRouteLoaderData {
  seo: SEOMetaParams;
}

export const getTutorialsRouteLoaderData: GetLoaderData<TutorialsRouteLoaderData> = (
  _apiClient,
  _queryClient,
  loaderArgs,
) =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(loaderArgs.request);
    const t = yield* getFixedT(locale);

    const routeUrl = getTutorialsRouteLink();

    return {
      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: t('TUTORIAL_META_DESCRIPTION'),
        keywords: t('TUTORIAL_META_KEYWORDS'),
        title: makePageMetaTitle(t('TUTORIALS_PAGE_TITLE'), t('META_APP_TITLE')),

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(routeUrl, hrefLang),
            hrefLang,
          })),
      },
    };
  });
