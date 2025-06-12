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

import { AlternativeThoughtModel } from '../../domain/models/alternative-thought.model';
import { LocalizedShortThoughtModel } from '../../domain/models/localized-short-thought.model';
import { LocalizedThoughtModel } from '../../domain/models/localized-thought.model';
import type {
  CreateThoughtParams,
  FindManyThoughtsParams,
  ThoughtsRepository,
} from '../../domain/repositories/thoughts.repository';
import {
  type DBLocalizedShortThought,
  type DBLocalizedThought,
  dbLocalizedShortThoughtSelect,
  dbLocalizedThoughtSelect,
} from './thoughts.repository.types';

const getWhere = (params: FindManyThoughtsParams): Prisma.LocalizedThoughtWhereInput => {
  const where: Prisma.LocalizedThoughtWhereInput = {};

  if (params.filter.languageCodeIn?.length) {
    where.languageCode = { in: params.filter.languageCodeIn };
  }

  if (params.filter?.published === true) where.publishedAt = { not: null };
  else if (params.filter?.published === false) where.publishedAt = null;

  if (params.filter?.authorId) {
    where.thought = where.thought ?? {};
    where.thought.authorId = params.filter.authorId;
  }

  return where;
};

@Injectable()
export class PrismaThoughtsRepository implements ThoughtsRepository {
  #logger = new Logger(PrismaThoughtsRepository.name);

  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  createThought(
    reqCtx: RequestContext,
    params: CreateThoughtParams
  ): Effect.Effect<LocalizedThoughtModel, UnknownReason | UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      this.#logger.debug('Creating thought');
      this.#logger.debug(`  > params: ${JSON.stringify(params)}`);

      const thoughtId = params.thoughtId;
      const dbThought = thoughtId
        ? yield* Effect.tryPromise(() => tx.thought.findUnique({ where: { id: thoughtId } }))
        : yield* Effect.tryPromise(() =>
            tx.thought.create({ data: { authorId: reqCtx.accountId, slug: params.slug } })
          );

      if (!dbThought) {
        this.#logger.error('  > no dbThought');

        return yield* new UnknownReason();
      }

      const dbLocalized: DBLocalizedThought = yield* Effect.tryPromise(() =>
        tx.localizedThought.create({
          data: {
            contentJSON: params.contentJSON as InputJsonValue,
            languageCode: params.languageCode,
            publishedAt: params.published ? new Date() : null,
            seoDescription: params.seoDescription,
            seoKeywords: params.seoKeywords,
            seoTitle: params.seoTitle,
            shortDescription: params.shortDescription,
            thoughtId: dbThought.id,
            title: params.title,
          },
          select: dbLocalizedThoughtSelect,
        })
      );

      return this.#mapToModel(dbLocalized);
    }).pipe(
      Effect.tapError((error) => {
        if (isUnknownException(error)) this.#logger.error(`Error creating thought ${error.error}`);
        return Effect.void;
      })
    );
  }

  checkSlugAvailability(reqCtx: RequestContext, slug: string): Effect.Effect<boolean, UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(() => tx.thought.findUnique({ where: { slug } })).pipe(Effect.map((thought) => !thought));
  }

  findManyLocalized(
    reqCtx: RequestContext,
    params: FindManyThoughtsParams
  ): Effect.Effect<LocalizedShortThoughtModel[], UnknownException> {
    this.#logger.debug(`findManyLocalized ${JSON.stringify(params)}`);

    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(async () =>
      prisma.localizedThought.findMany({
        orderBy: params.orderBy,
        select: dbLocalizedShortThoughtSelect,
        skip: params.skip,
        take: params.take,
        where: getWhere(params),
      })
    ).pipe(
      Effect.tap((thoughts) => this.#logger.debug(`  > thoughts: ${JSON.stringify(thoughts)}`)),
      Effect.map((thoughts) => thoughts.map((t) => this.#mapToShortLocalizedModel(t)))
    );
  }

  findTotalLocalized(reqCtx: RequestContext, params: FindManyThoughtsParams): Effect.Effect<number, UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;
    return Effect.tryPromise(async () => prisma.localizedThought.count({ where: getWhere(params) }));
  }

  #getAuthor(dbLocalizedThought: DBLocalizedShortThought): AuthorModel | null {
    const authorId = dbLocalizedThought.thought.author?.id;
    const authorName = dbLocalizedThought.thought.author?.profiles.find((p) => p.isRoot)?.name;
    return !authorId || !authorName ? null : AuthorModel.from({ id: authorId, name: authorName });
  }

  #mapToModel(dbLocalizedThought: DBLocalizedThought): LocalizedThoughtModel {
    const alternatives = dbLocalizedThought.thought.localizations
      .filter((bp) => bp.id !== dbLocalizedThought.id)
      .map((bp) =>
        AlternativeThoughtModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedThought.thought.slug,
        })
      );

    return LocalizedThoughtModel.from({
      alternatives,
      author: this.#getAuthor(dbLocalizedThought),
      contentJSON: typeof dbLocalizedThought.contentJSON === 'object' ? dbLocalizedThought.contentJSON : null,
      createdAt: dbLocalizedThought.thought.createdAt,
      id: dbLocalizedThought.thought.id,
      languageCode: dbLocalizedThought.languageCode,
      publishedAt: dbLocalizedThought.thought.publishedAt,
      seo: SeoModel.from({
        description: dbLocalizedThought.seoDescription,
        keywords: dbLocalizedThought.seoKeywords,
        title: dbLocalizedThought.seoTitle,
      }),
      shortDescription: dbLocalizedThought.shortDescription,
      slug: dbLocalizedThought.thought.slug,
      title: dbLocalizedThought.title,
      updatedAt: dbLocalizedThought.thought.updatedAt,
    });
  }

  #mapToShortLocalizedModel(dbLocalizedThought: DBLocalizedShortThought): LocalizedShortThoughtModel {
    const alternatives = dbLocalizedThought.thought.localizations
      .filter((bp) => bp.id !== dbLocalizedThought.id)
      .map((bp) =>
        AlternativeThoughtModel.from({
          id: bp.id,
          languageCode: bp.languageCode,
          publishedAt: bp.publishedAt,
          slug: dbLocalizedThought.thought.slug,
        })
      );

    return LocalizedShortThoughtModel.from({
      alternatives,
      author: this.#getAuthor(dbLocalizedThought),
      createdAt: dbLocalizedThought.createdAt,
      id: dbLocalizedThought.id,
      languageCode: dbLocalizedThought.languageCode,
      publishedAt: dbLocalizedThought.publishedAt,
      shortDescription: dbLocalizedThought.shortDescription,
      slug: dbLocalizedThought.thought.slug,
      title: dbLocalizedThought.title,
    });
  }
}
