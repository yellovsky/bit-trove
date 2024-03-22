// global modules
import { Effect } from 'effect';
import { gql } from '@apollo/client';
import type { PartialBlogPostFragment } from '@repo/api-models/blog-post';
import { BlogPostHorizontalPreview } from '@repo/ui/blog-post-horizontal-preview';

// local modules
import { rscPage } from '~/src/rsc';
import { makeRscQuery } from '~/src/apollo/apollo.rsc';
import { blogPage as blogPageCn, blogList as blogListCn } from './page.module.scss';

// ==========================================================
//               B L O G   P O S T   Q U E R Y
// ==========================================================
type BlogPostListQueryResponse = {
  blogposts: {
    data: PartialBlogPostFragment[];
  };
};

type BlogPostListFP = {};

const BLOG_POST_LIST_QUERY = gql`
  query GetBlogPostList {
    blogposts {
      data {
        ...PartialBlogPostFragment
      }
    }
  }
`;

const fetchBlogPostList = () =>
  makeRscQuery<BlogPostListQueryResponse, BlogPostListFP>(BLOG_POST_LIST_QUERY)({});

export default rscPage(
  () => Effect.all({ blogPosts: fetchBlogPostList() }),
  ({ blogPosts }) => {
    return (
      <div className={blogPageCn}>
        <div className={blogListCn}>
          {blogPosts.data.blogposts.data.map((blogpost) => (
            <BlogPostHorizontalPreview key={blogpost.id} blogpost={blogpost} />
          ))}
        </div>
      </div>
    );
  }
);
