// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBGuideFragment } from 'src/db-models/guide';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { RepositoryContext } from 'src/types/context';
import { PRISMA_SRV, type PrismaService } from 'src/modules/prisma';

// local modules
import type {
  FindManyGuideRepositoryParams,
  FindUniqueGuideRepositroeyParams,
  GuideRepositoryService,
} from './guide.types';

@Injectable()
export class GuideRepositoryServiceClass implements GuideRepositoryService {
  constructor(@Inject(PRISMA_SRV) private readonly prismaSrv: PrismaService) {}

  findUnique<TSelect extends Prisma.GuideSelect>(
    ctx: RepositoryContext,
    params: FindUniqueGuideRepositroeyParams<TSelect>,
  ): Effect.Effect<DBGuideFragment<TSelect> | null, Error> {
    const tx = ctx.tx || this.prismaSrv;

    return Effect.tryPromise(() =>
      tx.guide.findUnique({ select: params.select, where: params.where }),
    );
  }

  findMany<TSelect extends Prisma.GuideSelect>(
    ctx: RepositoryContext,
    { orderBy, ...rest }: FindManyGuideRepositoryParams<TSelect>,
  ): Effect.Effect<ItemsWithTotal<DBGuideFragment<TSelect> | null>, Error> {
    const tx = ctx.tx || this.prismaSrv;

    if ('title' in orderBy) {
      return Effect.gen(this, function* () {
        const where = { article: { guide: rest.where } };
        const select = {
          article: { select: { guide: { select: rest.select } } },
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

        return { items: items.map((item) => item.article.guide), total };
      });
    } else {
      return Effect.all({
        items: Effect.tryPromise(() =>
          tx.guide.findMany({
            orderBy: orderBy,
            select: rest.select,
            skip: rest.skip,
            take: rest.take,
            where: rest.where,
          }),
        ),
        total: Effect.tryPromise(() => tx.guide.count({ where: rest.where })),
      });
    }
  }
}
