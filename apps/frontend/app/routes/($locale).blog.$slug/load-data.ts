// global modules
import type { BlogPostResponse } from '@repo/api-models';
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';

// common modules
import type { ApiClient } from '~/api/api-client';
import { fetchBlogPost } from '~/api/blog-post';
import { failedResponseToResponse, getParamsParam, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  blogPostResponse: BlogPostResponse;

  pageSEOTitle: string;
  pageSEODescription: string | null;
  pageSEOKeywords: string | null;
}

export const loadBlogPostRouteData = (
  apiClient: ApiClient,
  { params, request }: LoaderFunctionArgs,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(request);
    const slug = yield* getParamsParam('slug', params);
    const blogPostResponse = yield* fetchBlogPost(apiClient, { locale, slug }).pipe(
      Effect.mapError(failedResponseToResponse),
    );

    return {
      blogPostResponse,
      pageSEODescription: blogPostResponse.data.seo_description,
      pageSEOKeywords: blogPostResponse.data.seo_keywords,
      pageSEOTitle: blogPostResponse.data.seo_title || blogPostResponse.data.title,
    };
  });
