// global modules
import * as R from 'ramda';
import type { BlogPostResponse } from '@repo/api-models';
import { Effect } from 'effect';
import type { LoaderFunctionArgs } from '@remix-run/node';

// common modules
import type { ApiClient } from '~/api/api-client';
import { fetchBlogPost } from '~/api/blog-post';
import type { SEOMetaParams } from '~/utils/seo';
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getBlogpostRouteLink } from '~/utils/links';
import { failedResponseToResponse, getParamsParam, getRequestLocale } from '~/utils/loader';

export interface LoaderData {
  blogPostResponse: BlogPostResponse;

  seo: SEOMetaParams;
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

    const routeUrl = getBlogpostRouteLink(blogPostResponse.data);

    return {
      blogPostResponse,

      seo: {
        canonical: addLocaleToLink(routeUrl, locale),
        description: blogPostResponse.data.seo_description,
        keywords: blogPostResponse.data.seo_keywords,
        title: blogPostResponse.data.seo_title || blogPostResponse.data.title,

        alternate: R.intersection(supportedLngs, blogPostResponse.data.language_codes)
          .filter(lang => lang !== locale)
          .map(hreflang => ({
            href: addLocaleToLink(routeUrl, hreflang),
            hreflang,
          })),
      },
    };
  });
