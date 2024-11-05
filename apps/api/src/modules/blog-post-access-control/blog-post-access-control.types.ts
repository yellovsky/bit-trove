// global modules
import { Option } from 'effect';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { ItemsWithTotal } from 'src/types/items-with-total';

import type {
  DBBlogPost,
  DBBlogPostAccessControl,
} from 'src/db-models/blog-post';

export interface BlogPostAccessControlService {
  canReadBlogPost(
    ctx: AccessControlContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<DBBlogPost>;

  canReadBlogPostItems<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: Array<TBlogPost | null>,
  ): Option.Option<Array<TBlogPost | null>>;

  canReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Option.Option<ItemsWithTotal<TBlogPost | null>>;
}

export const BLOG_POST_ACCESS_CONTROL_SRV = 'BLOG_POST_ACCESS_CONTROL_SRV';
