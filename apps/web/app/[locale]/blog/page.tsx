// global modules
import { Effect, flow } from 'effect';

import {
  PARTIAL_BLOG_POST_LIST_QUERY,
  type BlogPostListQueryResponse,
  type BlogPostListVariables,
} from '@repo/api-models/blog-post';

// local modules
import { BlogPostContent } from './_page-content';
import { HydrateQuery } from '~/src/apollo/hydrate-query';
import { getLocaleUrlParam, rscPage, rscQuery } from '~/src/rsc';

const prefetchBlogPostList = flow(
  getLocaleUrlParam,
  Effect.map((locale) => ({ locale, limit: 2, sort: ['createdAt:desc' as const] })),
  Effect.flatMap(
    rscQuery<BlogPostListQueryResponse, BlogPostListVariables>(PARTIAL_BLOG_POST_LIST_QUERY)
  ),
  Effect.map((update) => ({ updates: { blogpost: update } }))
);

export default rscPage(prefetchBlogPostList, ({ updates }) => (
  <HydrateQuery updates={updates}>
    <BlogPostContent initialVariables={updates.blogpost.variables} />
  </HydrateQuery>
));
