import type { Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV } from 'src/modules/prisma';

import { TagModel } from '../../domain/models/tag.model';
import type { FindAllTagsParams, TagsRepository } from '../../domain/repositories/tags.repository';
import { type DBTag, dbTagSelect } from './tags.repository.types';

const getAllWhere = (params: FindAllTagsParams): Prisma.TagWhereInput => {
  const where: Prisma.TagWhereInput = {};
  if (params.filter?.like) where.name = { contains: params.filter.like, mode: 'insensitive' };
  return where;
};

@Injectable()
export class PrismaTagsRepository implements TagsRepository {
  constructor(
    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {}

  findAll(reqCtx: RequestContext, params: FindAllTagsParams): Effect.Effect<TagModel[], UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;
    const where = getAllWhere(params);

    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() => tx.tag.findMany({ select: dbTagSelect, where }));
      return dbTags.map(this.#mapToModel);
    });
  }

  createManyTags(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;
    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() =>
        tx.tag.createManyAndReturn({ data: names.map((name) => ({ name })), select: dbTagSelect })
      );
      return dbTags.map(this.#mapToModel);
    });
  }

  findTagsByNames(reqCtx: RequestContext, names: string[]): Effect.Effect<TagModel[], UnknownException> {
    const tx = reqCtx.tx ?? this.prismaSrv;

    return Effect.gen(this, function* () {
      const dbTags = yield* Effect.tryPromise(() =>
        tx.tag.findMany({ select: dbTagSelect, where: { name: { in: names } } })
      );
      return dbTags.map(this.#mapToModel);
    });
  }

  #mapToModel(dbTag: DBTag): TagModel {
    return TagModel.from({ id: dbTag.id, name: dbTag.name });
  }
}
