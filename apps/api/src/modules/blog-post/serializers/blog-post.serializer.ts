// global modules
import { Effect, pipe } from 'effect';

// common modules
import { NotFoundAPIError } from 'src/exceptions';
import type { Serialize } from 'src/types/serializer';
import { serializeArticleBlockList } from 'src/modules/article';

// local modules
import { BlogPostEntity } from '../entities/blog-post.entity';
import type { DBBlogPost } from '../repositories/blog-post.db-models';
import { serializeBlogPostSegment } from './blog-post-segment.serializer';

export const serializeBlogPost: Serialize<DBBlogPost, BlogPostEntity> = (
  ctx,
  dbBlogPost,
) => {
  const segment = serializeBlogPostSegment(ctx, dbBlogPost);
  const articleTranslation = Effect.fromNullable(
    ctx.getTranslations(dbBlogPost.article),
  );
  const blocks = pipe(
    articleTranslation,
    Effect.flatMap((t) => serializeArticleBlockList(ctx, t.blocks)),
  );

  return Effect.all({ articleTranslation, blocks, segment }).pipe(
    Effect.map(
      ({ articleTranslation, blocks, segment }) =>
        new BlogPostEntity({
          ...segment,
          blocks,
          seo_description: articleTranslation.seo_description,
          seo_keywords: articleTranslation.seo_keywords,
          seo_title: articleTranslation.seo_title,
        }),
    ),
    Effect.mapError(() => new NotFoundAPIError({})),
  );
};
