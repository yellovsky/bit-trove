// global modules
import * as R from 'ramda';
import type { BlogPostResponse } from '@repo/api-models';
import { Effect } from 'effect';

// common modules
import { fetchBlogPost } from '~/api/blog-post';
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getBlogpostRouteLink } from '~/utils/links';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

import {
  failedResponseToResponse,
  getFixedT,
  type GetLoaderData,
  getParamsParam,
  getRequestLocale,
} from '~/utils/loader';

export interface LoaderData {
  blogPostResponse: BlogPostResponse;
  seo: SEOMetaParams;
}

export const getBlogPostLoaderData: GetLoaderData<LoaderData> = (
  apiClient,
  _queryClient,
  loaderArgs,
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getRequestLocale(loaderArgs.request);
    const t = yield* getFixedT(locale);

    const slug = yield* getParamsParam('slug', loaderArgs.params);
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
        title: makePageMetaTitle(
          blogPostResponse.data.seo_title || blogPostResponse.data.title,
          t('META_APP_TITLE'),
        ),

        alternate: R.intersection(supportedLngs, blogPostResponse.data.language_codes)
          .filter(lang => lang !== locale)
          .map(hrefLang => ({
            href: addLocaleToLink(routeUrl, hrefLang),
            hrefLang,
          })),
      },
    };
  });
