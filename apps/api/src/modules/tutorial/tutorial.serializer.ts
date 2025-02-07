// global modules
import { Effect, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import { ListResponseMetaEntity } from 'src/entities/response';
import type { SerializerContext } from 'src/types/context';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';
import type { DBTutorial, DBTutorialSegment } from 'src/db-models/tutorial';

import {
  ARTICLE_SERIALIZER_SRV,
  type ArticleSerializerService,
} from 'src/modules/article';

import {
  TutorialEntity,
  TutorialListResponseEntity,
  TutorialResponseEntity,
  TutorialSegmentEntity,
} from 'src/entities/tutorial';

// local modules
import type { TutorialSerializerService } from './tutorial.types';

@Injectable()
export class TutorialSerializerServiceClass
  implements TutorialSerializerService
{
  constructor(
    @Inject(ARTICLE_SERIALIZER_SRV)
    private readonly articleSerializerSrv: ArticleSerializerService,
  ) {}

  serializeTutorialSegment(
    ctx: SerializerContext,
    dbTutorial: DBTutorialSegment,
  ): Effect.Effect<TutorialSegmentEntity, ApiError> {
    return Effect.all({
      articleTranslation: Effect.fromNullable(
        ctx.getTranslations(dbTutorial.article),
      ),
    }).pipe(
      Effect.map(
        ({ articleTranslation }) =>
          new TutorialSegmentEntity({
            created_at: dbTutorial.created_at.toUTCString(),
            id: dbTutorial.id,
            language_code: articleTranslation.language_code,
            original_language_code: dbTutorial.article.original_language_code,
            published_at: dbTutorial.published_at?.toUTCString() || null,
            short_description: articleTranslation.short_description,
            slug: dbTutorial.slug,
            title: articleTranslation.title,

            language_codes: dbTutorial.article.translations.map(
              (t) => t.language_code,
            ),
          }),
      ),
      Effect.mapError(() => new NotFoundAPIError({})),
    );
  }

  serializeTutorial(
    ctx: SerializerContext,
    dbTutorial: DBTutorial,
  ): Effect.Effect<TutorialEntity, ApiError> {
    const segment = this.serializeTutorialSegment(ctx, dbTutorial);
    const articleTranslation = Effect.fromNullable(
      ctx.getTranslations(dbTutorial.article),
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
          new TutorialEntity({
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

  serializeTutorialResponse(
    ctx: SerializerContext,
    dbTutorial: DBTutorial,
  ): Effect.Effect<TutorialResponseEntity, ApiError> {
    return this.serializeTutorial(ctx, dbTutorial).pipe(
      Effect.map((data) => new TutorialResponseEntity({ data })),
    );
  }

  serializeTutorialListResponse(
    ctx: SerializerContext,
    dbTutorialList: ItemsWithTotalAndPagination<DBTutorialSegment | null>,
  ): Effect.Effect<TutorialListResponseEntity, ApiError> {
    const items = Effect.all(
      dbTutorialList.items.map((item) =>
        pipe(
          Effect.fromNullable(item),
          Effect.flatMap((item) => this.serializeTutorialSegment(ctx, item)),
          Effect.catchAll(() => Effect.succeed(null)),
        ),
      ),
    );

    return items.pipe(
      Effect.map(
        (data) =>
          new TutorialListResponseEntity({
            data,
            meta: new ListResponseMetaEntity({
              pagination: {
                limit: dbTutorialList.limit,
                offset: dbTutorialList.offset,
                total: dbTutorialList.total,
              },
            }),
          }),
      ),
    );
  }
}
