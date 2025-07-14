import { Inject, Injectable, Logger } from '@nestjs/common';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ArticleUpsertBody } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { ArticleModel } from '../../domain/models/article.model';
import { ARTICLES_REPOSITORY } from '../../domain/repositories/articles.repository';
import { ARTICLE_ACCESS_SRV } from '../services/article-access.service.interface';

@Injectable()
export class MyArticleCreateUseCase {
  #logger = new Logger(MyArticleCreateUseCase.name);

  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly repository: IdentifierOf<typeof ARTICLES_REPOSITORY>,

    @Inject(ARTICLE_ACCESS_SRV)
    private readonly accessSrv: IdentifierOf<typeof ARTICLE_ACCESS_SRV>
  ) {}

  execute(
    reqCtx: RequestContext,
    body: ArticleUpsertBody
  ): Effect.Effect<ArticleModel, ExclusionReason | UnknownException> {
    this.#logger.debug('Creating article');
    this.#logger.debug(`  > body: ${JSON.stringify(body)}`);

    return this.accessSrv.canCreateArticle(reqCtx).pipe(
      Effect.flatMap(() =>
        this.repository.createArticle(reqCtx, {
          contentJSON: body.contentJSON,
          entryId: body.entryId,
          languageCode: body.languageCode,
          published: body.published,
          seoDescription: body.seoDescription,
          seoKeywords: body.seoKeywords,
          seoTitle: body.seoTitle,
          shortDescription: body.shortDescription,
          slug: body.slug,
          tags: body.tags,
          title: body.title,
          type: body.type,
        })
      )
    );
  }
}
