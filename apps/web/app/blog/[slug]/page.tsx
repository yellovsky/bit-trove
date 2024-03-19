// global modules
import { Effect, pipe } from 'effect';
import { ApolloError, gql } from '@apollo/client';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { NOT_FOUND_APOLLO_ERROR } from '@repo/api-models/apollo';
import type { BlogPostEntityFragment } from '@repo/api-models/blog-post';

// local modules
import { makeRscQuery } from '../../../src/apollo/apollo.rsc';
import { getStringUrlParam, rscMetadata, rscPage, type RSCPageProps } from '../../../src/rsc';
import { pagePadding as pagePaddingCn } from './page.module.scss';

// ==========================================================
//               B L O G   P O S T   Q U E R Y
// ==========================================================
type BlogPostQueryResponse = {
  blogposts: {
    data: BlogPostEntityFragment[];
  };
};

type BlogPostFP = { slug: string };

const BLOG_POST_QUERY = gql`
  query GetBlogPost($slug: String) {
    blogposts(filters: { slug: { eq: $slug } }) {
      data {
        ...BlogPostEntityFragment
      }
    }
  }
`;

const fetchBlogPost = (
  props: RSCPageProps<'slug'>
): Effect.Effect<{ data: BlogPostEntityFragment }, ApolloError> =>
  pipe(
    getStringUrlParam('slug')(props),
    Effect.flatMap((slug) =>
      makeRscQuery<BlogPostQueryResponse, BlogPostFP>(BLOG_POST_QUERY)({
        slug,
      })
    ),
    Effect.flatMap((response) =>
      response.data.blogposts.data[0]
        ? Effect.succeed({ data: response.data.blogposts.data[0] })
        : Effect.fail(NOT_FOUND_APOLLO_ERROR)
    )
  );

// ==========================================================
//                    M E T A D A T A
// ==========================================================
export const generateMetadata = rscMetadata(
  (props) => Effect.all({ blogPost: fetchBlogPost(props) }),
  ({ blogPost }) => blogPost.data.attributes.seo
);

// ==========================================================
//                    C O M P O N E N T
// ==========================================================
const viewsCount = '3k';
const commentsCount = 10;
const publishDate = 'Posted On November 8, 2016';
const author = {
  href: '/',
  name: 'Jack Dawson',
  avatar:
    'https://themes-themegoods.b-cdn.net/grandmagazine/demo/wp-content/uploads/2016/11/cropped-author1-60x60.jpg',
};

export default rscPage(
  (props) => Effect.all({ blogPost: fetchBlogPost(props) }),
  ({ blogPost }) => {
    const tags = blogPost.data.attributes.tags.data.map((tag) => ({
      href: `/tags/${tag.attributes.slug}`,
      name: tag.attributes.name,
    }));

    return (
      <>
        <ContentPageHeader
          author={author}
          tags={tags}
          className={pagePaddingCn}
          viewsCount={viewsCount}
          publishDate={publishDate}
          commentsCount={commentsCount}
        >
          {blogPost.data.attributes.title}
        </ContentPageHeader>
      </>
    );
  }
);
