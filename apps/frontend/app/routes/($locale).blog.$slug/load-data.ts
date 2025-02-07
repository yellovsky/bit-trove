// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { BlogPost, BlogPostResponse } from '@repo/api-models';
import type { BlogPosting, WithContext } from 'schema-dts';

// common modules
import { fetchBlogPost } from '~/api/blog-post';
import { supportedLngs } from '~/config/i18n';

import {
  getISODate,
  makePageMetaTitle,
  type OGMeta,
  type SEOMetaParams,
  type TwitterMeta,
} from '~/utils/seo';

import {
  addHostnameToPathname,
  addLocaleToLink,
  getBlogpostRouteLink,
  getTutorialRouteLink,
} from '~/utils/links';

import {
  failedResponseToResponse,
  getFixedT,
  type GetLoaderData,
  getParamsParam,
  getRequestLocale,
} from '~/utils/loader';

const getBlogpostJSONSchema = (tutorial: BlogPost, locale: string): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',

  description: tutorial.short_description || tutorial.seo_description || undefined,
  headline: tutorial.title,
  keywords: tutorial.seo_keywords || undefined,
  url: addHostnameToPathname(getTutorialRouteLink(tutorial, locale)),

  dateCreated: !tutorial.created_at ? undefined : getISODate(tutorial.created_at),
  datePublished: !tutorial.published_at ? undefined : getISODate(tutorial.published_at),
});

const getBlogPostOG = (tutorial: BlogPost, locale: string): OGMeta | null => {
  const description = tutorial.short_description || tutorial.seo_description;

  return !description || !tutorial.published_at
    ? null
    : {
        description,
        locale,
        published_time: tutorial.published_at,
        title: tutorial.title,
        type: 'article',
        url: addHostnameToPathname(getTutorialRouteLink(tutorial, locale)),
      };
};

const getBlogPostTwiiterMeta = (tutorial: BlogPost): TwitterMeta | null => {
  const description = tutorial.short_description || tutorial.seo_description;
  return !description || !tutorial.published_at
    ? null
    : { card: 'summary', description, title: tutorial.title };
};

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
        jsonSchemas: [getBlogpostJSONSchema],
        keywords: blogPostResponse.data.seo_keywords,
        og: getBlogPostOG(blogPostResponse.data, locale),
        twitter: getBlogPostTwiiterMeta(blogPostResponse.data),

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
