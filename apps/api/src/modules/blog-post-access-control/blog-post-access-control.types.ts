// global modules
import { Option } from 'effect';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBBlogPost } from 'src/db-models/blog-post';

export interface BlogPostAccessControlService {
  canReadBlogPost(
    ctx: AccessControlContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<DBBlogPost>;
}

export const BLOG_POST_ACCESS_CONTROL_SRV = 'BLOG_POST_ACCESS_CONTROL_SRV';
