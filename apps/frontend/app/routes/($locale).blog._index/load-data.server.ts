// global modules
import { Effect } from 'effect';
import { dehydrate, type DehydratedState } from '@tanstack/react-query';

// common modules
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getBlogRouteLink } from '~/utils/links';
import { type FetchBlogPostListVariables, prefetchBlogPostListQuery } from '~/api/blog-post';
import { getFixedT, type GetLoaderData, getParamsParam } from '~/utils/loader.server';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

export interface LoaderData {
  seo: SEOMetaParams;
  blogPostListVariables: FetchBlogPostListVariables;
  dehydratedState: DehydratedState;
}

export const getBlogLoaderData: GetLoaderData<LoaderData> = (
  apiClient,
  queryClient,
  { params },
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getParamsParam('locale', params);
    const t = yield* getFixedT(locale);

    const blogPostListVariables: FetchBlogPostListVariables = {
      locale,
      sort: 'created_at',
    };

    yield* prefetchBlogPostListQuery(apiClient, queryClient, blogPostListVariables);

    return {
      blogPostListVariables,
      dehydratedState: dehydrate(queryClient),

      seo: {
        canonical: addLocaleToLink(getBlogRouteLink(), locale),
        description: t('BLOG_PAGE_META_DESCRIPTION'),
        jsonSchemas: null,
        keywords: t('BLOG_PAGE_META_KEYWORDS'),
        og: null,
        title: makePageMetaTitle(t('BLOG_PAGE_TITLE'), t('META_APP_TITLE')),
        twitter: null,

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(getBlogRouteLink(), hrefLang),
            hrefLang,
          })),
      },
    };
  });
