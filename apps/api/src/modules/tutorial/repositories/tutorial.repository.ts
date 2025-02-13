// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { PrismaService } from 'src/modules/prisma';
import type { RepositoryContext } from 'src/types/context';

// local modules
import type { DBTutorialFragment } from './tutorial.db-models';

export interface FindUniqueTutorialRepositroeyParams<
  TSelect extends Prisma.TutorialSelect,
> {
  select: TSelect;
  where: Prisma.TutorialWhereUniqueInput;
}

export interface FindManyTutorialRepositoryParams<
  TSelect extends Prisma.TutorialSelect,
> {
  select: TSelect;
  where: Prisma.TutorialWhereInput;
  skip: number;
  take: number;
  language: string;
  orderBy: { title: Prisma.SortOrder } | { created_at: Prisma.SortOrder };
}

export interface UpdteTutorialRepositroeyParams<
  TSelect extends Prisma.TutorialSelect,
> {
  select: TSelect;
  data: Prisma.TutorialUpdateInput;
  where: Prisma.TutorialWhereUniqueInput;
}

@Injectable()
export class TutorialRepositoryService {
  constructor(
    @Inject()
    private readonly prismaSrv: PrismaService,
  ) {}

  findUnique<TSelect extends Prisma.TutorialSelect>(
    ctx: RepositoryContext,
    params: FindUniqueTutorialRepositroeyParams<TSelect>,
  ): Effect.Effect<DBTutorialFragment<TSelect> | null, Error> {
    const tx = ctx.tx || this.prismaSrv;

    return Effect.tryPromise(() =>
      tx.tutorial.findUnique({ select: params.select, where: params.where }),
    );
  }

  findMany<TSelect extends Prisma.TutorialSelect>(
    ctx: RepositoryContext,
    { orderBy, ...rest }: FindManyTutorialRepositoryParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBTutorialFragment<TSelect> | null>, Error> {
    const tx = ctx.tx || this.prismaSrv;

    if ('title' in orderBy) {
      return Effect.gen(this, function* () {
        const where = { article: { tutorial: rest.where } };
        const select = {
          article: { select: { tutorial: { select: rest.select } } },
        };

        const { items, total } = yield* Effect.all({
          items: Effect.tryPromise(() =>
            tx.articleTranslation.findMany({
              orderBy: orderBy,
              select,
              skip: rest.skip,
              take: rest.take,
              where,
            }),
          ),
          total: Effect.tryPromise(() =>
            tx.articleTranslation.count({ where }),
          ),
        });

        return { items: items.map((item) => item.article.tutorial), total };
      });
    } else {
      return Effect.all({
        items: Effect.tryPromise(() =>
          tx.tutorial.findMany({
            orderBy: orderBy,
            select: rest.select,
            skip: rest.skip,
            take: rest.take,
            where: rest.where,
          }),
        ),
        total: Effect.tryPromise(() =>
          tx.tutorial.count({ where: rest.where }),
        ),
      });
    }
  }

  update<TSelect extends Prisma.TutorialSelect>(
    ctx: RepositoryContext,
    params: UpdteTutorialRepositroeyParams<TSelect>,
  ): Effect.Effect<DBTutorialFragment<TSelect> | null, Error> {
    const tx = ctx.tx || this.prismaSrv;

    return Effect.tryPromise(() =>
      tx.tutorial.update({
        data: params.data,
        select: params.select,
        where: params.where,
      }),
    );
  }
}
