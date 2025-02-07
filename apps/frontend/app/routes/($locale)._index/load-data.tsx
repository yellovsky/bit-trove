// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, GuideItemListFP } from '@repo/api-models';
import { dehydrate, type DehydratedState } from '@tanstack/react-query';

// common modules
import { addLocaleToLink } from '~/utils/links';
import { initialPageParam } from '~/api/pagination';
import { prefetchBlogPostListQuery } from '~/api/blog-post';
import { prefetchGuideListQuery } from '~/api/guide';
import type { SEOMetaParams } from '~/utils/seo';
import { supportedLngs } from '~/config/i18n';
import { getFixedT, type GetLoaderData, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  blogPostFP: BlogPostListFP;
  guidesFP: GuideItemListFP;
  dehydratedState: DehydratedState;
  seo: SEOMetaParams;
}

export const getIndexLoaderData: GetLoaderData<LoaderData> = (
  apiClient,
  queryClient,
  { request },
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
        canonical: addLocaleToLink('/', locale),
        description: t('INDEX_PAGE_SEO_DESCRIPTION'),
        keywords: t('INDEX_PAGE_SEO_KEYWORDS'),
        title: t('META_APP_TITLE'),

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink('/', hrefLang),
            hrefLang,
          })),
      },
    };
  });
