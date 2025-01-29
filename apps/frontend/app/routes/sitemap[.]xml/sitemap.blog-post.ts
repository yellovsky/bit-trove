// global modules
import * as R from 'ramda';
import { Effect } from 'effect';
import type { BlogPostListFP, BlogPostSegment } from '@repo/api-models';

// common modules
import { fetchBlogPostList } from '~/api/blog-post';
import { getApiClient } from '~/api/api-client';
import { initialPageParam } from '~/api/pagination';
import { supportedLngs } from '~/config/i18n';

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
        pathname: `/${locale}/${blogPost.slug}`,

        alternameLangs: commonLocales
          .filter(al => al !== locale)
          .map(hreflang => ({ hreflang, pathname: `/${hreflang}` })),
      }),
    )
    .filter(Boolean)
    .join('\n');
};

export const getBlogPostTags = (): Effect.Effect<string | null> =>
  Effect.gen(function* () {
    const blogPostFP: BlogPostListFP = {
      locale: 'en',
      page: initialPageParam,
      sort: '-created_at',
    };

    const apiClient = getApiClient();
    const firstPage = yield* fetchBlogPostList(apiClient, blogPostFP);

    const total = firstPage.meta.pagination.total;
    const pageSize = initialPageParam.limit;
    const pagesToFetchCount = Math.ceil(total / pageSize) - 1;

    const restPages =
      pagesToFetchCount < 0
        ? []
        : yield* Effect.all(
            R.range(1, pageSize).map(index =>
              fetchBlogPostList(apiClient, {
                ...blogPostFP,
                page: { ...blogPostFP.page, offset: index * blogPostFP.page.limit },
              }),
            ),
          );

    const blogPosts = [
      ...firstPage.data,
      ...restPages.map(response => response.data).flat(),
    ].filter(val => !!val);

    return blogPosts.map(getBlogPostUrlTag).filter(Boolean).join('\n') as any;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
