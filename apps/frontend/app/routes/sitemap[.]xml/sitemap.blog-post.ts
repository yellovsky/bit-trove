// global modules
import * as R from 'ramda';
import type { BlogPostSegment } from '@repo/api-models';
import { Effect } from 'effect';

// common modules
import { getApiClient } from '~/api/api-client';
import { getBlogpostRouteLink } from '~/utils/links';
import { supportedLngs } from '~/config/i18n';
import { fetchAllBlogPosts, type FetchBlogPostListInfiniteVariables } from '~/api/blog-post';

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
    const blogPosts = yield* fetchAllBlogPosts(apiClient, fetchBlogPostVariables);

    return blogPosts.map(getBlogPostUrlTag).filter(Boolean).join('\n') as any;
  }).pipe(Effect.catchAll(() => Effect.succeed(null)));
