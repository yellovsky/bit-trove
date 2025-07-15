import type { Prisma } from '@generated/prisma';
import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { TransactionContext } from 'src/modules/prisma';

import { TagModel } from '../../domain/models/tag.model';
import type { FindAllTagsQuery, TagsRepository } from '../../domain/repositories/tags.repository';
import { type DBTag, dbTagSelect } from './tags.repository.types';

const getAllWhere = (params: FindAllTagsQuery): Prisma.TagWhereInput => {
  const where: Prisma.TagWhereInput = {};
  if (params.filter?.like) where.name = { contains: params.filter.like, mode: 'insensitive' };
  return where;
};

@Injectable()
export class PrismaTagsRepository implements TagsRepository {
  findAll(txCtx: TransactionContext, params: FindAllTagsQuery): Effect.Effect<TagModel[], UnknownException> {
    const where = getAllWhere(params);

    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() => txCtx.tx.tag.findMany({ select: dbTagSelect, where }));
      return dbTags.map(this.#mapToModel);
    });
  }

  createManyTags(txCtx: TransactionContext, names: string[]): Effect.Effect<TagModel[], UnknownException> {
    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() =>
        txCtx.tx.tag.createManyAndReturn({
          data: names.map((name) => ({ name, slug: name.toLowerCase() })),
          select: dbTagSelect,
        })
      );
      return dbTags.map(this.#mapToModel);
    });
  }

  findTagsByNames(txCtx: TransactionContext, names: string[]): Effect.Effect<TagModel[], UnknownException> {
    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() =>
        txCtx.tx.tag.findMany({ select: dbTagSelect, where: { name: { in: names } } })
      );
      return dbTags.map(this.#mapToModel);
    });
  }

  #mapToModel(dbTag: DBTag): TagModel {
    return TagModel.from({ id: dbTag.id, name: dbTag.name, slug: dbTag.slug });
  }
}
