// global modules
import { Effect, pipe } from 'effect';
import { ApolloError, gql } from '@apollo/client';
import { ContentPageHeader } from '@repo/ui/content-page-header';
import { NOT_FOUND_APOLLO_ERROR } from '@repo/api-models/apollo';
import { shortenItemsCount } from '@repo/utils/shorten-items-count';
import type { BlogPostEntityFragment } from '@repo/api-models/blog-post';

// local modules
import { getRSCClient, makeRscQuery } from '../../../../src/apollo/apollo.rsc';
import { getStringUrlParam, rscMetadata, rscPage, type RSCPageProps } from '../../../../src/rsc';
import { pagePadding as pagePaddingCn } from './page.module.scss';
import { RichTextBlock } from '@repo/ui/rich-text-block';
import { TwoColumnsLayout } from '@repo/ui/two-columns-layout';
import { AsideCategories } from '../../../../components/aside-categories/aside-categories.component';
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

const INCREMENT_BLOG_POST_VIEWS_COUNT = gql`
  mutation IncrementBlogPostViews($itemID: ID!) {
    incrementBlogPostViews(itemID: $itemID)
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
    /**
     * Trigger blog post view
     */
    getRSCClient().mutate({
      mutation: INCREMENT_BLOG_POST_VIEWS_COUNT,
      variables: { itemID: blogPost.data.id },
    });

    const tags = blogPost.data.attributes.tags.data.map((tag) => ({
      href: `/tags/${tag.attributes.slug}`,
      name: tag.attributes.name,
    }));

    const extraContent = <AsideCategories categories={blogPost.data.attributes.categories.data} />;

    return (
      <>
        <ContentPageHeader
          author={author}
          tags={tags}
          className={pagePaddingCn}
          viewsCount={shortenItemsCount(blogPost.data.attributes.views_count)}
          publishDate={publishDate}
          commentsCount={commentsCount}
          cover={'http://localhost:1337' + blogPost.data.attributes.cover.data?.attributes.url}
        >
          {blogPost.data.attributes.title}
        </ContentPageHeader>

        <TwoColumnsLayout className={pagePaddingCn} extraContent={extraContent}>
          {blogPost.data.attributes.blocks.map((block) => (
            <RichTextBlock key={block.id} block={block} />
          ))}
        </TwoColumnsLayout>
      </>
    );
  }
);
