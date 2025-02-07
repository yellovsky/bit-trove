// global modules
import { Effect } from 'effect';

// common modules
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getGuidesRouteLink } from '~/utils/links';
import { getFixedT, type GetLoaderData, getRequestLocale } from '~/utils/loader';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

export interface LoaderData {
  seo: SEOMetaParams;
}

export const getGuidesLoaderData: GetLoaderData<LoaderData> = (
  _apiClient,
  _queryClient,
  loaderArgs,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(loaderArgs.request);
    const t = yield* getFixedT(locale);

    const routeUrl = getGuidesRouteLink();

    return {
      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: t('TUTORIAL_META_DESCRIPTION'),
        keywords: t('TUTORIAL_META_KEYWORDS'),
        title: makePageMetaTitle(t('GUIDES_PAGE_TITLE'), t('META_APP_TITLE')),

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(routeUrl, hrefLang),
            hrefLang,
          })),
      },
    };
  });
