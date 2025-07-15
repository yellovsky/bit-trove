import type { Prisma } from '@generated/prisma';
import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';

import type { TransactionContext } from 'src/modules/prisma';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import type {
  ArticleRelationRepository,
  FindArticlesWithRelationsQuery,
  UpdateArticleRelationsData,
} from '../../domain/repositories/article-relation.repository';
import { dbArticleRelationSelect } from './article-relations.repository.types';
import { mapToArticleWithRelationModel } from './model-mappers';

const getWhere = (params: FindArticlesWithRelationsQuery): Prisma.ArticleRelationWhereInput => {
  const where: Prisma.ArticleRelationWhereInput = {};

  if (params.filter.relatedTo) {
    where.OR = [{ sourceId: params.filter.relatedTo }, { targetId: params.filter.relatedTo }];
  }

  return where;
};

@Injectable()
export class PrismaArticleRelationsRepository implements ArticleRelationRepository {
  findArticlesWithRelations(
    txCtx: TransactionContext,
    params: FindArticlesWithRelationsQuery
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.articleRelation.findMany({
        select: dbArticleRelationSelect,
        where: getWhere(params),
      })
    ).pipe(
      Effect.map((relations) =>
        relations.map((relation) => mapToArticleWithRelationModel(relation, params.filter.relatedTo))
      )
    );
  }

  updateArticleRelations(
    txCtx: TransactionContext,
    data: UpdateArticleRelationsData
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException> {
    return Effect.tryPromise(() =>
      txCtx.tx.articleRelation.deleteMany({
        where: { OR: [{ sourceId: data.articleId }, { targetId: data.articleId }] },
      })
    ).pipe(
      Effect.flatMap(() =>
        Effect.tryPromise(() =>
          txCtx.tx.articleRelation.createManyAndReturn({
            data: data.relations.map((relation, order) => ({
              order: order,
              relationType: relation.relationType,
              sourceId: data.articleId,
              targetId: relation.targetArticleId,
            })),
            select: dbArticleRelationSelect,
          })
        )
      ),
      Effect.map((relations) => relations.map((relation) => mapToArticleWithRelationModel(relation, data.articleId)))
    );
  }
}
