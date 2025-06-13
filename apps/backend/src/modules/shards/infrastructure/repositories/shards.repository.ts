import type { Prisma } from '@generated/prisma';
import type { InputJsonValue } from '@generated/prisma/runtime/library';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import { isUnknownException, type UnknownException } from 'effect/Cause';

import { UnknownReason } from 'src/shared/excluded';
import { AuthorModel } from 'src/shared/models/author.model';
import { SeoModel } from 'src/shared/models/seo.model';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { AlternativeShardModel } from '../../domain/models/alternative-shard.model';
import { LocalizedShardModel } from '../../domain/models/localized-shard.model';
import { LocalizedShortShardModel } from '../../domain/models/localized-short-shard.model';
import type {
  CreateShardParams,
  FindManyShardsParams,
  ShardsRepository,
} from '../../domain/repositories/shards.repository';
import {
  type DBLocalizedShard,
  type DBLocalizedShortShard,
  dbLocalizedShardSelect,
  dbLocalizedShortShardSelect,
} from './shards.repository.types';

const getWhere = (params: FindManyShardsParams): Prisma.LocalizedShardWhereInput => {
  const where: Prisma.LocalizedShardWhereInput = {};

  if (params.filter.languageCodeIn?.length) {
    where.languageCode = { in: params.filter.languageCodeIn };
  }

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) {
    where.shard = where.shard ?? {};
    where.shard.authorId = params.filter.authorId;
  }

  return where;
};

@Injectable()
export class PrismaShardsRepository implements ShardsRepository {
  #logger = new Logger(PrismaShardsRepository.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  createShard(
    reqCtx: RequestContext,
    params: CreateShardParams
  ): Effect.Effect<LocalizedShardModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating shard');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const shardId = params.shardId;
      const dbShard = shardId
        ? yield* Effect.tryPromise(() => tx.shard.findUnique({ where: { id: shardId } }))
        : yield* Effect.tryPromise(() => tx.shard.create({ data: { authorId: reqCtx.accountId, slug: params.slug } }));

      if (!dbShard) {
        this.#logger.error('  > no dbShard');

        return yield* new UnknownReason();
      }

      const dbLocalized: DBLocalizedShard = yield* Effect.tryPromise(() =>
        tx.localizedShard.create({
          data: {
            contentJSON: params.contentJSON as InputJsonValue,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shardId: dbShard.id,
            shortDescription: params.shortDescription,
            title: params.title,
          },
          select: dbLocalizedShardSelect,
        })
      );

      return this.#mapToModel(dbLocalized);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating shard ${error.error}`);
        return Effect.void;
      })
    );
  }

  checkSlugAvailability(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(() => tx.shard.findUnique({ where: { slug } })).pipe(Effect.map((shard) => !shard));
  }

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyShardsParams
  ): Effect.Effect<LocalizedShortShardModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.localizedShard.findMany({
        orderBy: params.orderBy,
        select: dbLocalizedShortShardSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((shards) => this.#logger.debug(`  > shards: ${JSON.stringify(shards)}`)),
      Effect.map((shards) => shards.map((t) => this.#mapToShortLocalizedModel(t)))
    );
  }

  findTotalLocalized(reqCtx: RequestContext, params: FindManyShardsParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.localizedShard.count({ where: getWhere(params) }));
  }

  #getAuthor(dbLocalizedShard: DBLocalizedShortShard): AuthorModel | null {
    const authorId = dbLocalizedShard.shard.author?.id;
    const authorName = dbLocalizedShard.shard.author?.profiles.find((p) => p.isRoot)?.name;
    return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
  }

  #mapToModel(dbLocalizedShard: DBLocalizedShard): LocalizedShardModel {
    const alternatives = dbLocalizedShard.shard.localizations
      .filter((bp) => bp.id !== dbLocalizedShard.id)
      .map((bp) =>
        AlternativeShardModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedShard.shard.slug,
        })
      );

    return LocalizedShardModel.from({
      alternatives,
      author: this.#getAuthor(dbLocalizedShard),
      contentJSON: typeof dbLocalizedShard.contentJSON === 'object' ? dbLocalizedShard.contentJSON : null,
      createdAt: dbLocalizedShard.shard.createdAt,
      id: dbLocalizedShard.shard.id,
      languageCode: dbLocalizedShard.languageCode,
      publishedAt: dbLocalizedShard.shard.publishedAt,
      seo: SeoModel.from({
        description: dbLocalizedShard.seoDescription,
        keywords: dbLocalizedShard.seoKeywords,
        title: dbLocalizedShard.seoTitle,
      }),
      shortDescription: dbLocalizedShard.shortDescription,
      slug: dbLocalizedShard.shard.slug,
      title: dbLocalizedShard.title,
      updatedAt: dbLocalizedShard.shard.updatedAt,
    });
  }

  #mapToShortLocalizedModel(dbLocalizedShard: DBLocalizedShortShard): LocalizedShortShardModel {
    const alternatives = dbLocalizedShard.shard.localizations
      .filter((bp) => bp.id !== dbLocalizedShard.id)
      .map((bp) =>
        AlternativeShardModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedShard.shard.slug,
        })
      );

    return LocalizedShortShardModel.from({
      alternatives,
      author: this.#getAuthor(dbLocalizedShard),
      createdAt: dbLocalizedShard.createdAt,
      id: dbLocalizedShard.id,
      languageCode: dbLocalizedShard.languageCode,
      publishedAt: dbLocalizedShard.publishedAt,
      shortDescription: dbLocalizedShard.shortDescription,
      slug: dbLocalizedShard.shard.slug,
      title: dbLocalizedShard.title,
    });
  }
}
