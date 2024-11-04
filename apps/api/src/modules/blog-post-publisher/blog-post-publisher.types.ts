// global modules
import { Option } from 'effect';

// common modules
import type { DBBlogPost } from 'src/db-models/blog-post';

export interface BlogPostPublisherService {
  checkBlogPost(
    published: boolean | 'published',
    dbBlogPost: DBBlogPost,
  ): Option.Option<DBBlogPost>;
}

export const BLOG_POST_PUBLISHER_SRV = 'BLOG_POST_PUBLISHER_SRV';
