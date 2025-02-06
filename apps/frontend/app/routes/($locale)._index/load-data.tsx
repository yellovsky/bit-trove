// global modules
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type { BlogPostListFP, GuideItemListFP } from '@repo/api-models';
import { dehydrate, type DehydratedState, type QueryClient } from '@tanstack/react-query';

// common modules
import { addLocaleToLink } from '~/utils/links';
import type { ApiClient } from '~/api/api-client';
import { initialPageParam } from '~/api/pagination';
import { prefetchBlogPostListQuery } from '~/api/blog-post';
import { prefetchGuideListQuery } from '~/api/guide';
import type { SEOMetaParams } from '~/utils/seo';
import { supportedLngs } from '~/config/i18n';
import { getFixedT, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  blogPostFP: BlogPostListFP;
  guidesFP: GuideItemListFP;
  dehydratedState: DehydratedState;

  seo: SEOMetaParams;
}

export const loadBlogRouteData = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  { request }: LoaderFunctionArgs,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const t = yield* getFixedT(locale);

    const blogPostFP: BlogPostListFP = {
      locale,
      page: initialPageParam,
      sort: '-created_at',
    };
    yield* prefetchBlogPostListQuery(apiClient, queryClient, blogPostFP);

    const guidesFP: GuideItemListFP = {
      locale,
      page: initialPageParam,
      sort: '-created_at',
    };
    yield* prefetchGuideListQuery(apiClient, queryClient, guidesFP);

    return {
      blogPostFP,
      dehydratedState: dehydrate(queryClient),
      guidesFP,

      seo: {
        canonical: '/',
        description: t('INDEX_PAGE_SEO_DESCRIPTION'),
        keywords: t('INDEX_PAGE_SEO_KEYWORDS'),
        title: t('INDEX_PAGE_SEO_TITLE'),

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hreflang => ({
            href: addLocaleToLink('/', hreflang),
            hreflang,
          })),
      },
    };
  });
