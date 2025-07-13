import type { Prisma } from '@generated/prisma';
import type { InputJsonValue } from '@generated/prisma/runtime/library';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import { isUnknownException, type UnknownException } from 'effect/Cause';

import { type ExclusionReason, NotFoundReason, UnknownReason } from 'src/shared/excluded';
import { AuthorModel } from 'src/shared/models/author.model';
import { SeoModel } from 'src/shared/models/seo.model';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { calculateReadingTime } from 'src/shared/utils/reading-time';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';
import { TAGS_SRV, TagModel } from 'src/modules/tags';

import { AlternativeArticleModel } from '../../domain/models/alternative-article.model';
import { ArticleModel } from '../../domain/models/article.model';
import type {
  ArticlesRepository,
  CreateArticleParams,
  FindByIdParams,
  FindBySlugParams,
  FindManyArticlesParams,
  UpdateArticleParams,
} from '../../domain/repositories/articles.repository';
import {
  type DBArticle,
  type DBShortArticle,
  dbArticleSelect,
  dbShortArticleSelect,
} from './articles.repository.types';

const getWhere = (params: FindManyArticlesParams): Prisma.ArticleWhereInput => {
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
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(TAGS_SRV)
    private readonly tagsSrv: IdentifierOf<typeof TAGS_SRV>
  ) {}

  createArticle(
    reqCtx: RequestContext,
    params: CreateArticleParams
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating article');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const publishedAt = params.published ? new Date() : null;

      const entryId = params.entryId;
      const dbEntry = entryId
        ? yield* Effect.tryPromise(() => tx.article.findUnique({ where: { id: entryId } }))
        : yield* Effect.tryPromise(() => tx.articleEntry.create({ data: { authorId: reqCtx.accountId, publishedAt } }));

      if (!dbEntry) {
        this.#logger.error('  > no dbEntry');
        return yield* new UnknownReason();
      }

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbArticle = yield* Effect.tryPromise(() =>
        tx.article.create({
          data: {
            authorId: reqCtx.accountId,
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

      return this.#mapToModel(dbArticle);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating article ${error.error}`);
        return Effect.void;
      })
    );
  }

  updateArticle(
    reqCtx: RequestContext,
    id: string,
    params: UpdateArticleParams
  ): Effect.Effect<ArticleModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating article');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const tags = yield* this.tagsSrv.getOrCreateTagsByNames(reqCtx, params.tags);

      // delete all tags before saving new ones
      yield* Effect.tryPromise(() => tx.articleTag.deleteMany({ where: { articleId: id } }));

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbArticle = yield* Effect.tryPromise(() =>
        tx.article.update({
          data: {
            contentJSON: params.contentJSON as InputJsonValue,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            readingTime,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            slug: params.slug,
            tags: { createMany: { data: tags.map((tag, order) => ({ order, tagId: tag.id })) } },
            title: params.title,
          },
          select: dbArticleSelect,
          where: { id },
        })
      );

      return this.#mapToModel(dbArticle);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating article ${error.error}`);
        return Effect.void;
      })
    );
  }

  getArticleIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(() => tx.article.findUnique({ where: { slug } })).pipe(
      Effect.map((blogPost) => blogPost?.id ?? null)
    );
  }

  findManyArticles(
    reqCtx: RequestContext,
    params: FindManyArticlesParams
  ): Effect.Effect<ArticleModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.article.findMany({
        orderBy: params.orderBy,
        select: dbShortArticleSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((articles) => this.#logger.debug(`  > articles: ${JSON.stringify(articles)}`)),
      Effect.map((articles) => articles.map((t) => this.#mapToModel(t)))
    );
  }

  findTotalArticles(reqCtx: RequestContext, params: FindManyArticlesParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.article.count({ where: getWhere(params) }));
  }

  findOneArticleById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.ArticleWhereUniqueInput = { id: params.id };
    if (params.filter?.published) where.publishedAt = { not: null };
    else if (params.filter?.published === false) where.publishedAt = null;

    if (params.filter?.authorId) where.authorId = params.filter.authorId;

    if (params.filter?.typeIn) where.type = { in: params.filter.typeIn };

    return Effect.tryPromise(async () => prisma.article.findUnique({ select: dbArticleSelect, where })).pipe(
      Effect.flatMap((dbArticle) =>
        !dbArticle ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbArticle))
      )
    );
  }

  findOneArticleBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.ArticleWhereInput = { slug: params.slug };
    if (params.filter?.published) where.publishedAt = { not: null };
    else if (params.filter?.published === false) where.publishedAt = null;

    if (params.filter?.authorId) where.authorId = params.filter.authorId;

    if (params.filter?.typeIn) where.type = { in: params.filter.typeIn };

    return Effect.tryPromise(async () => prisma.article.findFirst({ select: dbArticleSelect, where })).pipe(
      Effect.flatMap((dbArticle) =>
        !dbArticle ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbArticle))
      )
    );
  }

  setArticlePublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    this.#logger.debug(`setArticlePublished ${id} ${published}`);
    return Effect.tryPromise(async () =>
      prisma.article.update({
        data: { publishedAt: published ? new Date() : null },
        select: dbArticleSelect,
        where: { id },
      })
    ).pipe(
      Effect.tap((dbArticle) => this.#logger.debug(`  > dbArticle: ${JSON.stringify(dbArticle)}`)),
      Effect.map((dbArticle) => this.#mapToModel(dbArticle))
    );
  }

  #getAuthor(dbArticle: DBArticle | DBShortArticle): AuthorModel | null {
    const authorId = dbArticle.author?.id;
    const authorName = dbArticle.author?.profiles.find((p) => p.isRoot)?.name;
    return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
  }

  #getSeo(dbArticle: DBArticle | DBShortArticle): SeoModel | null {
    return 'seoDescription' in dbArticle
      ? SeoModel.from({
          description: dbArticle.seoDescription,
          keywords: dbArticle.seoKeywords,
          title: dbArticle.seoTitle,
        })
      : null;
  }

  #getAlternatives(dbArticle: DBArticle | DBShortArticle): AlternativeArticleModel[] {
    return dbArticle.entry.articles
      .filter((a) => a.id !== dbArticle.id)
      .map((a) =>
        AlternativeArticleModel.from({
          id: a.id,
          languageCode: a.languageCode,
          publishedAt: a.publishedAt,
          slug: a.slug,
        })
      );
  }

  #mapToModel(dbArticle: DBArticle | DBShortArticle): ArticleModel {
    const contentJSON =
      'contentJSON' in dbArticle && typeof dbArticle.contentJSON === 'object' ? dbArticle.contentJSON : null;

    return ArticleModel.from({
      alternatives: this.#getAlternatives(dbArticle),
      author: this.#getAuthor(dbArticle),
      contentJSON,
      createdAt: dbArticle.createdAt,
      entryId: dbArticle.entry.id,
      id: dbArticle.id,
      languageCode: dbArticle.languageCode,
      publishedAt: dbArticle.publishedAt,
      readingTime: dbArticle.readingTime,
      seo: this.#getSeo(dbArticle),
      shortDescription: dbArticle.shortDescription,
      slug: dbArticle.slug,
      tags: dbArticle.tags
        .sort((a, b) => a.order - b.order)
        .map((t) => TagModel.from({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
      title: dbArticle.title,
      type: dbArticle.type,
      updatedAt: dbArticle.updatedAt,
    });
  }
}
