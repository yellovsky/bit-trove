// global modules
import { Effect, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import { ListResponseMetaEntity } from 'src/entities/response';
import type { SerializerContext } from 'src/types/context';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';
import type { DBBlogPost, DBBlogPostSegment } from 'src/db-models/blog-post';

import {
  ARTICLE_SERIALIZER_SRV,
  type ArticleSerializerService,
} from 'src/modules/article';

import {
  BlogPostEntity,
  BlogPostListResponseEntity,
  BlogPostResponseEntity,
  BlogPostSegmentEntity,
} from 'src/entities/blog-post';

// local modules
import type { BlogPostSerializerService } from './blog-post.types';

@Injectable()
export class BlogPostSerializerServiceClass
  implements BlogPostSerializerService
{
  constructor(
    @Inject(ARTICLE_SERIALIZER_SRV)
    private readonly articleSerializerSrv: ArticleSerializerService,
  ) {}

  serializeBlogPostSegment(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPostSegment,
  ): Effect.Effect<BlogPostSegmentEntity, ApiError> {
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
  }

  serializeBlogPost(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Effect.Effect<BlogPostEntity, ApiError> {
    const segment = this.serializeBlogPostSegment(ctx, dbBlogPost);
    const articleTranslation = Effect.fromNullable(
      ctx.getTranslations(dbBlogPost.article),
    );
    const blocks = pipe(
      articleTranslation,
      Effect.flatMap((t) =>
        this.articleSerializerSrv.serializeBlockLists(ctx, t.blocks),
      ),
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
  }

  serializeBlogPostResponse(
    ctx: SerializerContext,
    dbBlogPost: DBBlogPost,
  ): Effect.Effect<BlogPostResponseEntity, ApiError> {
    return this.serializeBlogPost(ctx, dbBlogPost).pipe(
      Effect.map((data) => new BlogPostResponseEntity({ data })),
    );
  }

  serializeBlogPostListResponse(
    ctx: SerializerContext,
    dbBlogPostList: ItemsWithTotalAndPagination<DBBlogPostSegment | null>,
  ): Effect.Effect<BlogPostListResponseEntity, ApiError> {
    const items = Effect.all(
      dbBlogPostList.items.map((item) =>
        pipe(
          Effect.fromNullable(item),
          Effect.flatMap((item) => this.serializeBlogPostSegment(ctx, item)),
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
  }
}
