import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';
import { validate as isUUID } from 'uuid';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import { TRANSACTION_SRV } from 'src/modules/prisma';
import { TAGS_SRV } from 'src/modules/tags/application/services/tags.service.interface';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLE_RELATION_REPOSITORY } from '../../domain/repositories/article-relation.repository';
import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';
import { ARTICLE_ACCESS_SRV } from './article-access.service.interface';
import type {
  ArticlesService,
  CreateArticleCommand,
  GetArticleByIdCommand,
  GetArticleBySlugCommand,
  GetArticleBySlugOrIdCommand,
  GetArticlesCommand,
  UpdateArticleCommand,
} from './articles.service.interface';

export class ArticlesServiceImpl implements ArticlesService {
  constructor(
    @Inject(ARTICLE_ACCESS_SRV)
    private readonly articlesAccessSrv: IdentifierOf<typeof ARTICLE_ACCESS_SRV>,

    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>,

    @Inject(ARTICLE_RELATION_REPOSITORY)
    private readonly articleRelationRepository: IdentifierOf<typeof ARTICLE_RELATION_REPOSITORY>,

    @Inject(TRANSACTION_SRV)
    private readonly transactionSrv: IdentifierOf<typeof TRANSACTION_SRV>,

    @Inject(TAGS_SRV)
    private readonly tagsSrv: IdentifierOf<typeof TAGS_SRV>
  ) {}

  getArticleById(
    txReqCtx: TxRequestContext,
    params: GetArticleByIdCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findArticleById(txReqCtx, params),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(txReqCtx, article))
    );
  }

  getArticleBySlug(
    txReqCtx: TxRequestContext,
    params: GetArticleBySlugCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findArticleBySlug(txReqCtx, params),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(txReqCtx, article))
    );
  }

  getArticleBySlugOrId(
    txReqCtx: TxRequestContext,
    params: GetArticleBySlugOrIdCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return isUUID(params.slugOrId)
      ? this.getArticleById(txReqCtx, { id: params.slugOrId, published: params.published, type: params.type })
      : this.getArticleBySlug(txReqCtx, { published: params.published, slug: params.slugOrId, type: params.type });
  }

  getArticles(
    txReqCtx: TxRequestContext,
    params: GetArticlesCommand
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findArticles(txReqCtx, params),
      Effect.flatMap((items) => this.articlesAccessSrv.filterCanReadArticleList(txReqCtx, items))
    );
  }

  createArticle(
    txReqCtx: TxRequestContext,
    command: CreateArticleCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return this.transactionSrv.withTransaction(txReqCtx, (txCtx) =>
      Effect.gen(this, function* () {
        yield* this.articlesAccessSrv.canCreateArticle(txCtx);
        const tags = yield* this.tagsSrv.getOrCreateTagsByNames(txCtx, command.tags);
        return yield* this.repository.createArticle(txCtx, { ...command, tagIds: tags.map((tag) => tag.id) });
      })
    );
  }

  updateArticle(
    txReqCtx: TxRequestContext,
    command: UpdateArticleCommand
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return this.transactionSrv.withTransaction(txReqCtx, (txCtx) =>
      Effect.gen(this, function* () {
        const articleToUpdated = yield* this.getArticleById(txCtx, { id: command.articleId });
        yield* this.articlesAccessSrv.canUpdateArticle(txCtx, articleToUpdated);

        const tags = yield* this.tagsSrv.getOrCreateTagsByNames(txCtx, command.data.tags);

        return yield* this.repository.updateArticle(txCtx, {
          ...command,
          data: { ...command.data, tagIds: tags.map((tag) => tag.id) },
        });
      })
    );
  }

  publishArticle(
    txReqCtx: TxRequestContext,
    id: string
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getArticleById(txReqCtx, { id }),
      Effect.flatMap((article) => this.articlesAccessSrv.canUpdateArticle(txReqCtx, article)),
      Effect.flatMap(() => this.repository.setArticlePublished(txReqCtx, id, true)),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(txReqCtx, article))
    );
  }

  unpublishArticle(
    txReqCtx: TxRequestContext,
    id: string
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getArticleById(txReqCtx, { id }),
      Effect.flatMap((article) => this.articlesAccessSrv.canUpdateArticle(txReqCtx, article)),
      Effect.flatMap(() => this.repository.setArticlePublished(txReqCtx, id, false)),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(txReqCtx, article))
    );
  }
}
