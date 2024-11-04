// global modules
import { Option } from 'effect';
import type { BlogPost, BlogPostResponse } from '@repo/api-models';

// common modules
import type { DBBlogPost } from 'src/db-models/blog-post';
import type { SerializerContext } from 'src/types/context';

export interface BlogPostSerializerService {
  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPost>;

  serializeBlogPostResponse(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<BlogPostResponse>;
}

export const BLOG_POST_SERIALIZER_SRV = 'BLOG_POST_SERIALIZER_SRV';
