// global modules
import type { DB } from 'src/db';
import { Effect } from 'effect';
import { eq } from 'drizzle-orm';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// common modules
import { DRIZZLE_SRV } from 'src/modules/drizzle';

import {
  articleBlocks,
  articles,
  articleTranslations,
  type DBArticleBlockSelect,
  type DBArticleSelect,
  type DBArticleTranslationSelect,
} from 'src/db/schema';

// local modules
import type { DBArticle, DBArticleTranslations } from './article.db-types';

import type {
  ArticleCodeBlockDTO,
  ArticleTextBlockDTO,
  UpdateCMSArticleDTO,
  UpdateCMSArticleTranslationsDTO,
} from '../dto/update-article.dto';

@Injectable()
export class ArticleRepository {
  constructor(@Inject(DRIZZLE_SRV) private readonly db: DB) {}

  insert(
    tx: DB | null,
    dto: UpdateCMSArticleDTO,
  ): Effect.Effect<DBArticle, Error> {
    return Effect.gen(this, function* () {
      const ttx = tx || this.db;

      const article = yield* this.#insertArticle(ttx, dto);

      const insertedTranslations = yield* Effect.all(
        dto.translations.map((translationsDTO) =>
          this.#insertArticleArticleTranslations(
            ttx,
            article.id,
            translationsDTO,
          ),
        ),
      );

      return { ...article, translations: insertedTranslations };
    });
  }

  update(
    tx: DB | null,
    articleID: string,
    dto: UpdateCMSArticleDTO,
  ): Effect.Effect<DBArticle, Error> {
    return Effect.gen(this, function* () {
      const ttx = tx || this.db;

      const article: DBArticleSelect | undefined = yield* Effect.tryPromise(
        () =>
          ttx.query.articles.findFirst({
            where: (articles, { eq }) => eq(articles.id, articleID),
          }),
      );

      if (!article) return yield* Effect.fail(new NotFoundException());

      yield* this.#deleteArticleArticleTranslations(ttx, articleID);
      const insertedTranslations = yield* Effect.all(
        dto.translations.map((translationsDTO) =>
          this.#insertArticleArticleTranslations(
            ttx,
            articleID,
            translationsDTO,
          ),
        ),
      );

      return { ...article, translations: insertedTranslations };
    });
  }

  #insertArticleArticleTranslations(
    tx: DB,
    articleID: string,
    dto: UpdateCMSArticleTranslationsDTO,
  ): Effect.Effect<DBArticleTranslations, Error> {
    return Effect.gen(this, function* () {
      const insertedTranslations: DBArticleTranslationSelect | undefined =
        yield* Effect.tryPromise(() =>
          tx
            .insert(articleTranslations)
            .values({
              article_id: articleID,
              language_code: dto.language_code,
              seo_description: dto.seo_description,
              seo_keywords: dto.seo_keywords,
              seo_title: dto.seo_title,
              short_description: dto.short_description,
              title: dto.title,
              updated_at: new Date(),
            })
            .returning({
              article_id: articleTranslations.article_id,
              created_at: articleTranslations.created_at,
              deleted_at: articleTranslations.deleted_at,
              id: articleTranslations.id,
              language_code: articleTranslations.language_code,
              published_at: articleTranslations.published_at,
              seo_description: articleTranslations.seo_description,
              seo_keywords: articleTranslations.seo_keywords,
              seo_title: articleTranslations.seo_title,
              short_description: articleTranslations.short_description,
              title: articleTranslations.title,
              updated_at: articleTranslations.updated_at,
            }),
        ).pipe(Effect.map((inserted) => inserted.at(0)));

      if (!insertedTranslations) {
        return yield* Effect.fail(new InternalServerErrorException());
      }

      const insertedBlocks = yield* this.#insertArticleTranslationsBlock(
        tx,
        insertedTranslations.id,
        dto.blocks,
      );

      return { ...insertedTranslations, blocks: insertedBlocks };
    });
  }

  #insertArticleTranslationsBlock(
    tx: DB,
    articleTranslationID: string,
    dtos: Array<ArticleTextBlockDTO | ArticleCodeBlockDTO>,
  ): Effect.Effect<DBArticleBlockSelect[], Error> {
    return Effect.tryPromise(() =>
      tx
        .insert(articleBlocks)
        .values(
          dtos.map((dto, order) => ({
            article_translations_id: articleTranslationID,
            content: dto.content,
            order,
            subtitle: dto.subtitle,
            title: dto.title,
            type: dto.type,
          })),
        )
        .returning({
          article_translations_id: articleBlocks.article_translations_id,
          content: articleBlocks.content,
          created_at: articleBlocks.created_at,
          deleted_at: articleBlocks.deleted_at,
          id: articleBlocks.id,
          order: articleBlocks.order,
          subtitle: articleBlocks.subtitle,
          title: articleBlocks.title,
          type: articleBlocks.type,
          updated_at: articleBlocks.updated_at,
        }),
    );
  }

  #deleteArticleArticleTranslations(
    tx: DB | null,
    articleID: string,
  ): Effect.Effect<void, Error> {
    return Effect.tryPromise(() =>
      (tx || this.db)
        .delete(articleTranslations)
        .where(eq(articleTranslations.article_id, articleID)),
    );
  }

  #insertArticle(
    tx: DB,
    dto: UpdateCMSArticleDTO,
  ): Effect.Effect<DBArticleSelect, Error> {
    return Effect.tryPromise(() =>
      tx
        .insert(articles)
        .values({ original_language_code: dto.original_language_code })
        .returning({
          author_id: articles.author_id,
          created_at: articles.created_at,
          deleted_at: articles.deleted_at,
          id: articles.id,
          original_language_code: articles.original_language_code,
          published_at: articles.published_at,
          updated_at: articles.updated_at,
        }),
    ).pipe(
      Effect.flatMap((inserted) => {
        const first = inserted.at(0);
        return first
          ? Effect.succeed(first)
          : Effect.fail(new NotFoundException());
      }),
    );
  }
}
