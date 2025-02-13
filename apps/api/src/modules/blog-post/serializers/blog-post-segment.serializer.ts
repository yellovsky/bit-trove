// global modules
import { Effect } from 'effect';

// common modules
import { NotFoundAPIError } from 'src/exceptions';
import type { Serialize } from 'src/types/serializer';

// local modules
import { BlogPostSegmentEntity } from '../entities/blog-post-segment.entity';
import type { DBBlogPostSegment } from '../repositories/blog-post.db-models';

export const serializeBlogPostSegment: Serialize<
  DBBlogPostSegment,
  BlogPostSegmentEntity
> = (ctx, dbBlogPost) => {
  return Effect.all({
    articleTranslation: Effect.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    ),
  }).pipe(
    Effect.map(
      ({ articleTranslation }) =>
        new BlogPostSegmentEntity({
          created_at: dbBlogPost.created_at.toUTCString(),
          id: dbBlogPost.id,
          language_code: articleTranslation.language_code,
          original_language_code: dbBlogPost.article.original_language_code,
          published_at: dbBlogPost.published_at?.toUTCString() || null,
          short_description: articleTranslation.short_description,
          slug: dbBlogPost.slug,
          title: articleTranslation.title,

          language_codes: dbBlogPost.article.translations.map(
            (t) => t.language_code,
          ),
        }),
    ),
    Effect.mapError(() => new NotFoundAPIError({})),
  );
};
