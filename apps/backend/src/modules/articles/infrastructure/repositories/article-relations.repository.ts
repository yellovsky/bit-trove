import type { Prisma } from '@generated/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { RequestContext } from 'src/shared/utils/request-context';

import { PRISMA_SRV, type PrismaTransaction } from 'src/modules/prisma';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import type {
  ArticleRelationRepository,
  FindManyArticlesWithRelationParams,
} from '../../domain/repositories/article-relation.repository';
import { dbArticleRelationSelect } from './article-relations.repository.types';
import { mapToArticleWithRelationModel } from './model-mappers';

const getWhere = (params: FindManyArticlesWithRelationParams): Prisma.ArticleRelationWhereInput => {
  const where: Prisma.ArticleRelationWhereInput = {};

  if (params.filter.related_to) {
    where.OR = [{ sourceId: params.filter.related_to }, { targetId: params.filter.related_to }];
  }

  return where;
};

@Injectable()
export class PrismaArticleRelationsRepository implements ArticleRelationRepository {
  constructor(@Inject(PRISMA_SRV) private readonly prismaSrv: PrismaTransaction) {}

  findManyArticlesWithRelation(
    reqCtx: RequestContext,
    params: FindManyArticlesWithRelationParams
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException> {
    const prisma = reqCtx.tx ?? this.prismaSrv;

    return Effect.tryPromise(() =>
      prisma.articleRelation.findMany({
        select: dbArticleRelationSelect,
        where: getWhere(params),
      })
    ).pipe(
      Effect.map((relations) =>
        relations.map((relation) => mapToArticleWithRelationModel(relation, params.filter.related_to))
      )
    );
  }
}
