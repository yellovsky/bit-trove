import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';
import { validate as isUUID } from 'uuid';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';
import { ARTICLE_ACCESS_SRV } from './article-access.service.interface';
import type {
  ArticlesService,
  CreateArticleParams,
  GetArticleByIdParams,
  GetArticleBySlugOrIdParams,
  GetArticleBySlugParams,
  GetManyArticlesParams,
  UpdateArticleParams,
} from './articles.service.interface';

export class ArticlesServiceImpl implements ArticlesService {
  constructor(
    @Inject(ARTICLE_ACCESS_SRV)
    private readonly articlesAccessSrv: IdentifierOf<typeof ARTICLE_ACCESS_SRV>,

    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>
  ) {}

  getArticleById(
    reqCtx: RequestContext,
    params: GetArticleByIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneArticleById(reqCtx, params),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(reqCtx, article))
    );
  }

  getArticleBySlug(
    reqCtx: RequestContext,
    params: GetArticleBySlugParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneArticleBySlug(reqCtx, params),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(reqCtx, article))
    );
  }

  getArticleBySlugOrId(
    reqCtx: RequestContext,
    params: GetArticleBySlugOrIdParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return isUUID(params.slugOrId)
      ? this.getArticleById(reqCtx, { id: params.slugOrId, published: params.published, type: params.type })
      : this.getArticleBySlug(reqCtx, { published: params.published, slug: params.slugOrId, type: params.type });
  }

  getManyArticles(
    reqCtx: RequestContext,
    params: GetManyArticlesParams
  ): Effect.Effect<Array<ArticleModel | ExclusionReason>, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findManyArticles(reqCtx, params),
      Effect.flatMap((items) => this.articlesAccessSrv.filterCanReadArticleList(reqCtx, items))
    );
  }

  createArticle(
    reqCtx: RequestContext,
    body: CreateArticleParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.articlesAccessSrv.canCreateArticle(reqCtx),
      Effect.flatMap(() => this.repository.createArticle(reqCtx, body))
    );
  }

  updateArticle(
    reqCtx: RequestContext,
    id: string,
    body: UpdateArticleParams
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getArticleById(reqCtx, { id }),
      Effect.flatMap((article) => this.articlesAccessSrv.canUpdateArticle(reqCtx, article)),
      Effect.flatMap(() => this.repository.updateArticle(reqCtx, id, body))
    );
  }

  publishArticle(reqCtx: RequestContext, id: string): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getArticleById(reqCtx, { id }),
      Effect.flatMap((article) => this.articlesAccessSrv.canUpdateArticle(reqCtx, article)),
      Effect.flatMap(() => this.repository.setArticlePublished(reqCtx, id, true)),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(reqCtx, article))
    );
  }

  unpublishArticle(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getArticleById(reqCtx, { id }),
      Effect.flatMap((article) => this.articlesAccessSrv.canUpdateArticle(reqCtx, article)),
      Effect.flatMap(() => this.repository.setArticlePublished(reqCtx, id, false)),
      Effect.flatMap((article) => this.articlesAccessSrv.filterCanReadArticle(reqCtx, article))
    );
  }
}
