// global modules
import { Effect } from 'effect';

// common modules
import type { Serialize } from 'src/types/serializer';

// local modules
import { BlogPostResponseEntity } from '../entities/blog-post-response.entity';
import type { DBBlogPost } from '../repositories/blog-post.db-models';
import { serializeBlogPost } from './blog-post.serializer';

export const serializeBlogPostResponse: Serialize<
  DBBlogPost,
  BlogPostResponseEntity
> = (ctx, dbBlogPost) =>
  serializeBlogPost(ctx, dbBlogPost).pipe(
    Effect.map((data) => new BlogPostResponseEntity({ data })),
  );
