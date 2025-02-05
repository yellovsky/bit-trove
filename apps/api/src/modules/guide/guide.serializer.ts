// global modules
import { Effect, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import { ListResponseMetaEntity } from 'src/entities/response';
import type { SerializerContext } from 'src/types/context';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';
import type { DBGuide, DBGuideSegment } from 'src/db-models/guide';

import {
  ARTICLE_SERIALIZER_SRV,
  type ArticleSerializerService,
} from 'src/modules/article';

import {
  GuideEntity,
  GuideListResponseEntity,
  GuideResponseEntity,
  GuideSegmentEntity,
} from 'src/entities/guide';

// local modules
import type { GuideSerializerService } from './guide.types';

@Injectable()
export class GuideSerializerServiceClass implements GuideSerializerService {
  constructor(
    @Inject(ARTICLE_SERIALIZER_SRV)
    private readonly articleSerializerSrv: ArticleSerializerService,
  ) {}

  serializeGuideSegment(
    ctx: SerializerContext,
    dbGuide: DBGuideSegment,
  ): Effect.Effect<GuideSegmentEntity, ApiError> {
    return Effect.all({
      articleTranslation: Effect.fromNullable(
        ctx.getTranslations(dbGuide.article),
      ),
    }).pipe(
      Effect.map(
        ({ articleTranslation }) =>
          new GuideSegmentEntity({
            created_at: dbGuide.created_at.toUTCString(),
            id: dbGuide.id,
            language_code: articleTranslation.language_code,
            original_language_code: dbGuide.article.original_language_code,
            published_at: dbGuide.published_at?.toUTCString() || null,
            short_description: articleTranslation.short_description,
            slug: dbGuide.slug,
            title: articleTranslation.title,

            language_codes: dbGuide.article.translations.map(
              (t) => t.language_code,
            ),
          }),
      ),
      Effect.mapError(() => new NotFoundAPIError({})),
    );
  }

  serializeGuide(
    ctx: SerializerContext,
    dbGuide: DBGuide,
  ): Effect.Effect<GuideEntity, ApiError> {
    const segment = this.serializeGuideSegment(ctx, dbGuide);
    const articleTranslation = Effect.fromNullable(
      ctx.getTranslations(dbGuide.article),
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
          new GuideEntity({
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

  serializeGuideResponse(
    ctx: SerializerContext,
    dbGuide: DBGuide,
  ): Effect.Effect<GuideResponseEntity, ApiError> {
    return this.serializeGuide(ctx, dbGuide).pipe(
      Effect.map((data) => new GuideResponseEntity({ data })),
    );
  }

  serializeGuideListResponse(
    ctx: SerializerContext,
    dbGuideList: ItemsWithTotalAndPagination<DBGuideSegment | null>,
  ): Effect.Effect<GuideListResponseEntity, ApiError> {
    const items = Effect.all(
      dbGuideList.items.map((item) =>
        pipe(
          Effect.fromNullable(item),
          Effect.flatMap((item) => this.serializeGuideSegment(ctx, item)),
          Effect.catchAll(() => Effect.succeed(null)),
        ),
      ),
    );

    return items.pipe(
      Effect.map(
        (data) =>
          new GuideListResponseEntity({
            data,
            meta: new ListResponseMetaEntity({
              pagination: {
                limit: dbGuideList.limit,
                offset: dbGuideList.offset,
                total: dbGuideList.total,
              },
            }),
          }),
      ),
    );
  }
}
