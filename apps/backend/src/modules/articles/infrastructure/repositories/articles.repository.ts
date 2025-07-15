import type { Prisma } from '@generated/prisma';
import type { InputJsonValue } from '@generated/prisma/runtime/library';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import { isUnknownException, type UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason, UnknownReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { calculateReadingTime } from 'src/shared/utils/reading-time';

import type { TransactionContext } from 'src/modules/prisma';
import { TAGS_SRV } from 'src/modules/tags';

import type { ArticleModel } from '../../domain/models/article.model';
import type {
  ArticlesRepository,
  CreateArticlePayload,
  FindArticleByIdQuery,
  FindArticleBySlugQuery,
  FindArticlesQuery,
  UpdateArticlePayload,
} from '../../domain/repositories/articles.repository';
import { dbArticleSelect, dbShortArticleSelect } from './articles.repository.types';
import { mapToArticleModel } from './model-mappers';

const getWhere = (params: FindArticlesQuery): Prisma.ArticleWhereInput => {
  const where: Prisma.ArticleWhereInput = {};

  if (params.filter.languageCodeIn?.length) {
    where.languageCode = { in: params.filter.languageCodeIn };
  }

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) where.authorId = params.filter.authorId;

  if (params.filter?.typeIn) where.type = { in: params.filter.typeIn };

  // Handle search parameter
  if (params.filter?.search) {
    const searchTerms = params.filter.search
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    if (searchTerms.length > 0) {
      where.OR = [
        // Search in title (case-insensitive)
        {
          title: {
            contains: searchTerms[0],
            mode: 'insensitive' as const,
          },
        },
        // Search in short description (case-insensitive)
        {
          shortDescription: {
            contains: searchTerms[0],
            mode: 'insensitive' as const,
          },
        },
        // Search in JSON content - look for text in Text nodes
        {
          contentJSON: {
            path: ['content', '*', 'content', '*', 'text'],
            string_contains: searchTerms[0],
          },
        },
        // Also search in nested content structures
        {
          contentJSON: {
            path: ['content', '*', 'content', '*', 'content', '*', 'text'],
            string_contains: searchTerms[0],
          },
        },
      ];

      // If multiple search terms, add additional conditions
      for (let i = 1; i < searchTerms.length; i++) {
        const term = searchTerms[i];
        where.OR.push(
          {
            title: {
              contains: term,
              mode: 'insensitive' as const,
            },
          },
          {
            shortDescription: {
              contains: term,
              mode: 'insensitive' as const,
            },
          },
          {
            contentJSON: {
              path: ['content', '*', 'content', '*', 'text'],
              string_contains: term,
            },
          },
          {
            contentJSON: {
              path: ['content', '*', 'content', '*', 'content', '*', 'text'],
              string_contains: term,
            },
          }
        );
      }
    }
  }

  return where;
};

@Injectable()
export class PrismaArticlesRepository implements ArticlesRepository {
  #logger = new Logger(PrismaArticlesRepository.name);

  constructor(
    @Inject(TAGS_SRV)
    private readonly tagsSrv: IdentifierOf<typeof TAGS_SRV>
  ) {}

  createArticle(
    txCtx: TransactionContext,
    params: CreateArticlePayload
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException> {
    return Effect.gen(this, function* () {
      this.#logger.debug('Creating article');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const publishedAt = params.published ? new Date() : null;

      const entryId = params.entryId;
      const dbEntry = entryId
        ? yield* Effect.tryPromise(() => txCtx.tx.article.findUnique({ where: { id: entryId } }))
        : yield* Effect.tryPromise(() => txCtx.tx.articleEntry.create({ data: { publishedAt } }));

      if (!dbEntry) {
        this.#logger.error('  > no dbEntry');
        return yield* new UnknownReason();
      }

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbArticle = yield* Effect.tryPromise(() =>
        txCtx.tx.article.create({
          data: {
            authorId: params.authorId,
            contentJSON: params.contentJSON as InputJsonValue,
            entryId: dbEntry.id,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            readingTime,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            slug: params.slug,
            title: params.title,
            type: params.type,
          },
          select: dbArticleSelect,
        })
      );

      return mapToArticleModel(dbArticle);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating article ${error.error}`);
        return Effect.void;
      })
    );
  }

  updateArticle(
    txCtx: TransactionContext,
    { articleId, data }: UpdateArticlePayload
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException> {
    return Effect.gen(this, function* () {
      this.#logger.debug('Creating article');
      this.#logger.debug(`  > articleId: ${articleId}`);
      this.#logger.debug(`  > params: ${JSON.stringify(data)}`);

      // TODO do not call service here (?)
      // const tags = yield* this.tagsSrv.getOrCreateTagsByNames(tx, params.tags);

      // delete all tags before saving new ones
      yield* Effect.tryPromise(() => txCtx.tx.articleTag.deleteMany({ where: { articleId } }));

      // Calculate reading time
      const readingTime = calculateReadingTime(data.contentJSON, data.title, data.shortDescription);

      const dbArticle = yield* Effect.tryPromise(() =>
        txCtx.tx.article.update({
          data: {
            contentJSON: data.contentJSON as InputJsonValue,
            languageCode: data.languageCode,
            publishedAt: data.published ? new Date() : null,
            readingTime,
            seoDescription: data.seoDescription,
            seoKeywords: data.seoKeywords,
            seoTitle: data.seoTitle,
            shortDescription: data.shortDescription,
            slug: data.slug,
            // TODO Revert
            // tags: { createMany: { data: data.tags.map((tag, order) => ({ order, tagId: tag.id })) } },
            title: data.title,
          },
          select: dbArticleSelect,
          where: { id: articleId },
        })
      );

      return mapToArticleModel(dbArticle);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating article ${error.error}`);
        return Effect.void;
      })
    );
  }

  getArticleIdBySlug(txCtx: TransactionContext, slug: string): Effect.Effect<string | null, UnknownException> {
    return Effect.tryPromise(() => txCtx.tx.article.findUnique({ where: { slug } })).pipe(
      Effect.map((blogPost) => blogPost?.id ?? null)
    );
  }

  findArticles(txCtx: TransactionContext, params: FindArticlesQuery): Effect.Effect<ArticleModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    return Effect.tryPromise(async () =>
      txCtx.tx.article.findMany({
        orderBy: params.orderBy,
        select: dbShortArticleSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((articles) => this.#logger.debug(`  > articles: ${JSON.stringify(articles)}`)),
      Effect.map((articles) => articles.map((t) => mapToArticleModel(t)))
    );
  }

  findArticlesTotal(txCtx: TransactionContext, params: FindArticlesQuery): Effect.Effect<number, UnknownException> {
    return Effect.tryPromise(async () => txCtx.tx.article.count({ where: getWhere(params) }));
  }

  findArticleById(
    txCtx: TransactionContext,
    params: FindArticleByIdQuery
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    const where: Prisma.ArticleWhereUniqueInput = { id: params.id };
    if (params.filter?.published) where.publishedAt = { not: null };
    else if (params.filter?.published === false) where.publishedAt = null;

    if (params.filter?.authorId) where.authorId = params.filter.authorId;

    if (params.filter?.typeIn) where.type = { in: params.filter.typeIn };

    return Effect.tryPromise(async () => txCtx.tx.article.findUnique({ select: dbArticleSelect, where })).pipe(
      Effect.flatMap((dbArticle) =>
        !dbArticle ? Effect.fail(new NotFoundReason()) : Effect.succeed(mapToArticleModel(dbArticle))
      )
    );
  }

  findArticleBySlug(
    txCtx: TransactionContext,
    params: FindArticleBySlugQuery
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    const where: Prisma.ArticleWhereInput = { slug: params.slug };
    if (params.filter?.published) where.publishedAt = { not: null };
    else if (params.filter?.published === false) where.publishedAt = null;

    if (params.filter?.authorId) where.authorId = params.filter.authorId;

    if (params.filter?.typeIn) where.type = { in: params.filter.typeIn };

    return Effect.tryPromise(async () => txCtx.tx.article.findFirst({ select: dbArticleSelect, where })).pipe(
      Effect.flatMap((dbArticle) =>
        !dbArticle ? Effect.fail(new NotFoundReason()) : Effect.succeed(mapToArticleModel(dbArticle))
      )
    );
  }

  setArticlePublished(
    txCtx: TransactionContext,
    id: string,
    published: boolean
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    this.#logger.debug(`setArticlePublished ${id} ${published}`);
    return Effect.tryPromise(async () =>
      txCtx.tx.article.update({
        data: { publishedAt: published ? new Date() : null },
        select: dbArticleSelect,
        where: { id },
      })
    ).pipe(
      Effect.tap((dbArticle) => this.#logger.debug(`  > dbArticle: ${JSON.stringify(dbArticle)}`)),
      Effect.map((dbArticle) => mapToArticleModel(dbArticle))
    );
  }
}
