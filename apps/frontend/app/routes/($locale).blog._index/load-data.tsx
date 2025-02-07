// global modules
import type { BlogPostListResponse } from '@repo/api-models';
import { Effect } from 'effect';

// common modules
import { fetchBlogPostList } from '~/api/blog-post';
import { supportedLngs } from '~/config/i18n';
import { addLocaleToLink, getBlogRouteLink } from '~/utils/links';
import { makePageMetaTitle, type SEOMetaParams } from '~/utils/seo';

import {
  failedResponseToResponse,
  getFixedT,
  type GetLoaderData,
  getParamsParam,
} from '~/utils/loader';

export interface LoaderData {
  seo: SEOMetaParams;
  blogPostListResponse: BlogPostListResponse;
}

export const getBlogLoaderData: GetLoaderData<LoaderData> = (
  apiClient,
  _queryClient,
  { params },
): Effect.Effect<LoaderData, Response> =>
  Effect.gen(function* () {
    const locale = yield* getParamsParam('locale', params);
    const t = yield* getFixedT(locale);

    const blogPostListResponse = yield* fetchBlogPostList(apiClient, {
      locale,
      page: { limit: 10, offset: 0 },
      sort: 'created_at',
    }).pipe(Effect.mapError(failedResponseToResponse));

    return {
      blogPostListResponse,

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
