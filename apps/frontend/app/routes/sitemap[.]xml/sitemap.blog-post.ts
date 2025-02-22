// global modules
import * as R from 'ramda';
import type { BlogPostSegment } from '@repo/api-models';
import { Effect } from 'effect';

// common modules
import { getApiClient } from '~/api/api-client';
import { getBlogpostRouteLink } from '~/utils/links';
import { supportedLngs } from '~/config/i18n';
import { type FetchBlogPostListInfiniteVariables, getBlogPostList } from '~/api/blog-post';
import { getPageParamByIndex, initialPageParam } from '~/api/pagination';

// local modules
import { generateURLTag } from './sitemap.helpers';

const getBlogPostUrlTag = (blogPost: BlogPostSegment): string | null => {
  const lastmod = blogPost.published_at;
  if (!lastmod) return null;

  const commonLocales = R.intersection(supportedLngs, blogPost.language_codes);

  return commonLocales
    .map(locale =>
      generateURLTag({
        lastmod,
        locale,
        pathname: getBlogpostRouteLink(blogPost, locale),

        alternameLangs: commonLocales
          .filter(al => al !== locale)
          .map(hreflang => ({ hreflang, pathname: getBlogpostRouteLink(blogPost, hreflang) })),
      }),
    )
    .filter(Boolean)
    .join('\n');
};

export const getBlogPostTags = (): Effect.Effect<string | null> =>
  Effect.gen(function* () {
    const fetchBlogPostVariables: FetchBlogPostListInfiniteVariables = {
      locale: 'en',
      sort: '-created_at',
    };

    const apiClient = getApiClient();
    const firstPage = yield* getBlogPostList(apiClient, {
      ...fetchBlogPostVariables,
      page: initialPageParam,
    });

    const total = firstPage.meta.pagination.total;
    const pageSize = initialPageParam.limit;
    const pagesToFetchCount = Math.ceil(total / pageSize) - 1;

    const restPages =
      pagesToFetchCount < 0
        ? []
        : yield* Effect.all(
            R.range(1, pageSize).map(index =>
              getBlogPostList(apiClient, {
                ...fetchBlogPostVariables,
                page: getPageParamByIndex(index),
              }),
            ),
          );

    const blogPosts = [
      ...firstPage.data,
      ...restPages.map(response => response.data).flat(),
    ].filter(val => !!val);

    return blogPosts.map(getBlogPostUrlTag).filter(Boolean).join('\n') as any;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
