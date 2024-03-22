// global modules
import { Effect, pipe } from 'effect';

import {
  FULL_BLOG_POST_QUERY,
  type FullBlogPostVariables,
  type FullBlogPostQueryResponse,
} from '@repo/api-models/blog-post';

// local modules
import { BlogPostPage } from './_page-content';
import { HydrateQuery } from '~/src/apollo/hydrate-query';

import {
  getStringUrlParam,
  rscPage,
  rscQuery,
  type RSCPageProps,
  getLocaleUrlParam,
  rscMetadata,
} from '~/src/rsc';

const prefetchBlogPost = (props: RSCPageProps<'slug' | 'locale'>) =>
  pipe(
    Effect.all({
      locale: getLocaleUrlParam(props),
      slug: getStringUrlParam('slug')(props),
    }),
    Effect.flatMap(
      rscQuery<FullBlogPostQueryResponse, FullBlogPostVariables>(FULL_BLOG_POST_QUERY)
    ),
    Effect.map((blogpost) => ({ updates: { blogpost } }))
  );

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export const generateMetadata = rscMetadata(
  prefetchBlogPost,
  ({ updates }) => updates.blogpost.data.blogposts.data[0]?.attributes.seo
);

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
export default rscPage(prefetchBlogPost, ({ updates }) => (
  <HydrateQuery updates={updates}>
    <BlogPostPage initialVariables={updates.blogpost.variables} />
  </HydrateQuery>
));
