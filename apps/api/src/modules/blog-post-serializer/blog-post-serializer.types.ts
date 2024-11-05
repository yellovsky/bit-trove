// global modules
import { Option } from 'effect';

import type {
  BlogPost,
  BlogPostListResponse,
  BlogPostResponse,
  BlogPostSegment,
} from '@repo/api-models';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import type { SerializerContext } from 'src/types/context';
import type { DBBlogPost, DBBlogPostSegment } from 'src/db-models/blog-post';

export interface BlogPostSerializerService {
  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPost>;

  serializeBlogPostSegment(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPostSegment,
  ): Option.Option<BlogPostSegment>;

  serializeBlogPostResponse(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPostResponse>;

  serializeBlogPostListResponse(
    ctx: SerializerContext,
    dbBlogPostList: ItemsWithTotalAndPagination<DBBlogPostSegment | null>,
  ): Option.Option<BlogPostListResponse>;
}

export const BLOG_POST_SERIALIZER_SRV = 'BLOG_POST_SERIALIZER_SRV';
