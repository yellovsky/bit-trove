// global modules
import { Option } from 'effect';

// common modules
import type { DBBlogPostPublishing } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';

export interface BlogPostPublisherService {
  checkBlogPost<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPost: TBlogPost,
  ): Option.Option<TBlogPost>;

  checkReadBlogPostItems<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPostSegmantList: Array<TBlogPost | null>,
  ): Option.Option<Array<TBlogPost | null>>;

  checkReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Option.Option<ItemsWithTotal<TBlogPost | null>>;
}

export const BLOG_POST_PUBLISHER_SRV = 'BLOG_POST_PUBLISHER_SRV';
