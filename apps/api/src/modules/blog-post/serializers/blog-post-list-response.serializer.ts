// global modules
import { Effect, pipe } from 'effect';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import { ListResponseMetaEntity } from 'src/common/entities/response';
import type { Serialize } from 'src/types/serializer';

// local modules
import { BlogPostListResponseEntity } from '../entities/blog-post-list-response.entity';
import type { DBBlogPostSegment } from '../repositories/blog-post.db-models';
import { serializeBlogPostSegment } from './blog-post-segment.serializer';

export const serializeBlogPostListResponse: Serialize<
  ItemsWithTotalAndPagination<DBBlogPostSegment | null>,
  BlogPostListResponseEntity
> = (ctx, dbBlogPostList) => {
  const items = Effect.all(
    dbBlogPostList.items.map((item) =>
      pipe(
        Effect.fromNullable(item),
        Effect.flatMap((item) => serializeBlogPostSegment(ctx, item)),
        Effect.catchAll(() => Effect.succeed(null)),
      ),
    ),
  );

  return items.pipe(
    Effect.map(
      (data) =>
        new BlogPostListResponseEntity({
          data,
          meta: new ListResponseMetaEntity({
            pagination: {
              limit: dbBlogPostList.limit,
              offset: dbBlogPostList.offset,
              total: dbBlogPostList.total,
            },
          }),
        }),
    ),
  );
};
