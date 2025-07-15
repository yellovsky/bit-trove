import { Inject, Injectable } from '@nestjs/common';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import { ARTICLE_RELATION_REPOSITORY } from '../../domain/repositories/article-relation.repository';
import type {
  ArticleRelationService,
  GetRelatedArticlesCommand,
  UpdateArticleRelationsCommand,
} from './article-relation.service.interface';

@Injectable()
export class ArticleRelationServiceImpl implements ArticleRelationService {
  constructor(
    @Inject(ARTICLE_RELATION_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLE_RELATION_REPOSITORY>
  ) {}

  getRelatedArticles(
    txReqCtx: TxRequestContext,
    command: GetRelatedArticlesCommand
  ): Effect.Effect<Array<ArticleWithRelationModel | ExclusionReason>, ExclusionReason | UnknownException> {
    return this.repository.findArticlesWithRelations(txReqCtx, command);
  }

  updateArticleRelations(
    txReqCtx: TxRequestContext,
    command: UpdateArticleRelationsCommand
  ): Effect.Effect<ArticleWithRelationModel[], ExclusionReason | UnknownException> {
    return this.repository.updateArticleRelations(txReqCtx, command);
  }
}
