// global modules
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { dehydrate, type DehydratedState, HydrationBoundary } from '@tanstack/react-query';

// common modules
import { addLocaleToLink } from '~/utils/links';
import { getApiClient } from '~/api/api-client';
import { getQueryClient } from '~/query-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';
import { supportedLngs } from '~/config/i18n';
import { type FetchTutorialListVariables, prefetchTutorialListQuery } from '~/api/tutorial';
import { getFixedT, getRequestLocale } from '~/utils/loader.server';
import { makeSeoMeta, type SEOMetaParams } from '~/utils/seo';

import {
  type FetchBlogPostListInfiniteVariables,
  prefetchBlogPostListInfiniteQuery,
} from '~/api/blog-post';

// local modules
import { IndexPage } from './page';

interface LoaderData {
  blogPostListVariables: FetchBlogPostListInfiniteVariables;
  tutorialListVariables: FetchTutorialListVariables;
  dehydratedState: DehydratedState;
  seo: SEOMetaParams;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pipeline: Effect.Effect<LoaderData, Response> = Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const t = yield* getFixedT(locale);

    const apiClient = getApiClient();
    const queryClient = getQueryClient();

    const blogPostListVariables: FetchBlogPostListInfiniteVariables = {
      locale,
      sort: '-created_at',
    };
    yield* prefetchBlogPostListInfiniteQuery(apiClient, queryClient, blogPostListVariables);

    const tutorialListVariables: FetchTutorialListVariables = { locale, sort: '-created_at' };
    yield* prefetchTutorialListQuery(apiClient, queryClient, tutorialListVariables);

    return {
      blogPostListVariables,
      dehydratedState: dehydrate(queryClient),
      tutorialListVariables,

      seo: {
        canonical: addLocaleToLink('/', locale),
        description: t('INDEX_PAGE_SEO_DESCRIPTION'),
        jsonSchemas: null,
        keywords: t('INDEX_PAGE_SEO_KEYWORDS'),
        og: null,
        title: t('META_APP_TITLE'),
        twitter: null,

        alternate: supportedLngs
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink('/', hrefLang),
            hrefLang,
          })),
      },
    };
  });

  return runAsyncEffect(pipeline);
};

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function IndexRoute() {
  const { tutorialListVariables, blogPostListVariables, dehydratedState } =
    useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <IndexPage
        blogPostListVariables={blogPostListVariables}
        tutorialListVariables={tutorialListVariables}
      />
    </HydrationBoundary>
  );
}
