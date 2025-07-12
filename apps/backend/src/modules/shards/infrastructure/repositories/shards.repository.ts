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

import { AlternativeShardModel } from '../../domain/models/alternative-shard.model';
import { ShardModel } from '../../domain/models/shard.model';
import type {
  CreateShardParams,
  FindByIdParams,
  FindBySlugParams,
  FindManyShardsParams,
  ShardsRepository,
  UpdateShardParams,
} from '../../domain/repositories/shards.repository';
import { type DBShard, type DBShortShard, dbShardSelect, dbShortShardSelect } from './shards.repository.types';

export const getWhere = (params: FindManyShardsParams): Prisma.ShardWhereInput => {
  const where: Prisma.ShardWhereInput = {};

  if (params.filter.languageCodeIn?.length) {
    where.languageCode = { in: params.filter.languageCodeIn };
  }

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) where.authorId = params.filter.authorId;

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
export class PrismaShardsRepository implements ShardsRepository {
  #logger = new Logger(PrismaShardsRepository.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>,

    @Inject(TAGS_SRV)
    private readonly tagsSrv: IdentifierOf<typeof TAGS_SRV>
  ) {}

  createShard(
    reqCtx: RequestContext,
    params: CreateShardParams
  ): Effect.Effect<ShardModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating shard');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const publishedAt = params.published ? new Date() : null;

      const entryId = params.entryId;
      const dbEntry = entryId
        ? yield* Effect.tryPromise(() => tx.shard.findUnique({ where: { id: entryId } }))
        : yield* Effect.tryPromise(() => tx.shardEntry.create({ data: { authorId: reqCtx.accountId, publishedAt } }));

      if (!dbEntry) {
        this.#logger.error('  > no dbEntry');
        return yield* new UnknownReason();
      }

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbshard = yield* Effect.tryPromise(() =>
        tx.shard.create({
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
          },
          select: dbShardSelect,
        })
      );

      return this.#mapToModel(dbshard);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating shard ${error.error}`);
        return Effect.void;
      })
    );
  }

  updateShard(
    reqCtx: RequestContext,
    id: string,
    params: UpdateShardParams
  ): Effect.Effect<ShardModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating shard');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const tags = yield* this.tagsSrv.getOrCreateTagsByNames(reqCtx, params.tags);

      // delete all tags before saving new ones
      yield* Effect.tryPromise(() => tx.shard.update({ data: { tags: { deleteMany: {} } }, where: { id } }));

      // Calculate reading time
      const readingTime = calculateReadingTime(params.contentJSON, params.title, params.shortDescription);

      const dbshard = yield* Effect.tryPromise(() =>
        tx.shard.update({
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
          select: dbShardSelect,
          where: { id },
        })
      );

      return this.#mapToModel(dbshard);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating shard ${error.error}`);
        return Effect.void;
      })
    );
  }

  getShardIdBySlug(reqCtx: RequestContext, slug: string): Effect.Effect<string | null, UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(() => tx.shard.findUnique({ where: { slug } })).pipe(
      Effect.map((shard) => shard?.id ?? null)
    );
  }

  findManyShards(reqCtx: RequestContext, params: FindManyShardsParams): Effect.Effect<ShardModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.shard.findMany({
        orderBy: params.orderBy,
        select: dbShortShardSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((shards) => this.#logger.debug(`  > shards: ${JSON.stringify(shards)}`)),
      Effect.map((shards) => shards.map((t) => this.#mapToModel(t)))
    );
  }

  findTotalShards(reqCtx: RequestContext, params: FindManyShardsParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.shard.count({ where: getWhere(params) }));
  }

  findOneShardById(
    reqCtx: RequestContext,
    params: FindByIdParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.ShardWhereUniqueInput = { id: params.id };
    if (params.published) where.publishedAt = { not: null };
    else if (params.published === false) where.publishedAt = null;

    if (params.authorId) where.authorId = params.authorId;

    return Effect.tryPromise(async () => prisma.shard.findUnique({ select: dbShardSelect, where })).pipe(
      Effect.flatMap((dbLocalizedShard) =>
        !dbLocalizedShard ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbLocalizedShard))
      )
    );
  }

  findOneShardBySlug(
    reqCtx: RequestContext,
    params: FindBySlugParams
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    const where: Prisma.ShardWhereInput = { slug: params.slug };
    if (params.published) where.publishedAt = { not: null };
    else if (params.published === false) where.publishedAt = null;

    return Effect.tryPromise(async () => prisma.shard.findFirst({ select: dbShardSelect, where })).pipe(
      Effect.flatMap((dbLocalizedShard) =>
        !dbLocalizedShard ? Effect.fail(new NotFoundReason()) : Effect.succeed(this.#mapToModel(dbLocalizedShard))
      )
    );
  }

  setShardPublished(
    reqCtx: RequestContext,
    id: string,
    published: boolean
  ): Effect.Effect<ShardModel, ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    this.#logger.debug(`setShardPublished ${id} ${published}`);
    return Effect.tryPromise(async () =>
      prisma.shard.update({
        data: { publishedAt: published ? new Date() : null },
        select: dbShardSelect,
        where: { id },
      })
    ).pipe(
      Effect.tap((dbShard) => this.#logger.debug(`  > dbShard: ${JSON.stringify(dbShard)}`)),
      Effect.map((dbShard) => this.#mapToModel(dbShard))
    );
  }

  #getAuthor(dbShard: DBShard | DBShortShard): AuthorModel | null {
    const authorId = dbShard.author?.id;
    const authorName = dbShard.author?.profiles.find((p) => p.isRoot)?.name;
    return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
  }

  #getSeo(dbShard: DBShard | DBShortShard): SeoModel | null {
    return 'seoDescription' in dbShard
      ? SeoModel.from({
          description: dbShard.seoDescription,
          keywords: dbShard.seoKeywords,
          title: dbShard.seoTitle,
        })
      : null;
  }

  #getAlternatives(dbShard: DBShard | DBShortShard): AlternativeShardModel[] {
    return dbShard.entry.shards
      .filter((bp) => bp.id !== dbShard.id)
      .map((bp) =>
        AlternativeShardModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbShard.slug,
        })
      );
  }

  #mapToModel(dbShard: DBShard | DBShortShard): ShardModel {
    const contentJSON =
      'contentJSON' in dbShard && typeof dbShard.contentJSON === 'object' ? dbShard.contentJSON : null;

    return ShardModel.from({
      alternatives: this.#getAlternatives(dbShard),
      author: this.#getAuthor(dbShard),
      contentJSON,
      createdAt: dbShard.createdAt,
      entryId: dbShard.entry.id,
      id: dbShard.id,
      languageCode: dbShard.languageCode,
      publishedAt: dbShard.publishedAt,
      readingTime: dbShard.readingTime,
      seo: this.#getSeo(dbShard),
      shortDescription: dbShard.shortDescription,
      slug: dbShard.slug,
      tags: dbShard.tags
        .sort((a, b) => a.order - b.order)
        .map((t) => TagModel.from({ id: t.tag.id, name: t.tag.name, slug: t.tag.slug })),
      title: dbShard.title,
      updatedAt: dbShard.updatedAt,
    });
  }
}
