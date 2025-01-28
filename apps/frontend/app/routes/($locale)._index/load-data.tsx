// global modules
import type { BlogPostListFP } from '@repo/api-models';
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { dehydrate, type DehydratedState, type QueryClient } from '@tanstack/react-query';

// common modules
import type { ApiClient } from '~/api/api-client';
import { initialPageParam } from '~/api/pagination';
import { prefetchBlogPostListQuery } from '~/api/blog-post';
import { getFixedT, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  pageSEOTitle: string;
  pageSEOKeywords: string;
  pageSEODescription: string;
  blogPostFP: BlogPostListFP;
  dehydratedState: DehydratedState;
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

    return {
      blogPostFP,
      dehydratedState: dehydrate(queryClient),
      pageSEODescription: t('INDEX_PAGE_SEO_DESCRIPTION'),
      pageSEOKeywords: t('INDEX_PAGE_SEO_KEYWORDS'),
      pageSEOTitle: t('INDEX_PAGE_SEO_TITLE'),
    };
  });
