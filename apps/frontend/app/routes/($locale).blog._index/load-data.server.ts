// global modules
import { Effect } from 'effect';
import { dehydrate, type DehydratedState } from '@tanstack/react-query';

// common modules
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getBlogRouteLink } from '~/utils/links';
import { getFixedT, type GetLoaderData, getParamsParam } from '~/utils/loader.server';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

import {
  type FetchBlogPostListInfiniteVariables,
  prefetchBlogPostListInfiniteQuery,
} from '~/api/blog-post';

export interface LoaderData {
  seo: SEOMetaParams;
  blogPostListVariables: FetchBlogPostListInfiniteVariables;
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

    const blogPostListVariables: FetchBlogPostListInfiniteVariables = {
      locale,
      sort: 'created_at',
    };

    yield* prefetchBlogPostListInfiniteQuery(apiClient, queryClient, blogPostListVariables);

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
