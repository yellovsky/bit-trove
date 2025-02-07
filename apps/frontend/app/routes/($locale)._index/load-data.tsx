// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, TutorialListFP } from '@repo/api-models';
import { dehydrate, type DehydratedState } from '@tanstack/react-query';

// common modules
import { addLocaleToLink } from '~/utils/links';
import { initialPageParam } from '~/api/pagination';
import { prefetchBlogPostListQuery } from '~/api/blog-post';
import { prefetchTutorialListQuery } from '~/api/tutorial';
import type { SEOMetaParams } from '~/utils/seo';
import { supportedLngs } from '~/config/i18n';
import { getFixedT, type GetLoaderData, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  blogPostListFP: BlogPostListFP;
  tutorialListFP: TutorialListFP;
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

    const blogPostListFP: BlogPostListFP = {
      locale,
      page: initialPageParam,
      sort: '-created_at',
    };
    yield* prefetchBlogPostListQuery(apiClient, queryClient, blogPostListFP);

    const tutorialListFP: TutorialListFP = {
      locale,
      page: initialPageParam,
      sort: '-created_at',
    };
    yield* prefetchTutorialListQuery(apiClient, queryClient, tutorialListFP);

    return {
      blogPostListFP,
      dehydratedState: dehydrate(queryClient),
      tutorialListFP,

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
