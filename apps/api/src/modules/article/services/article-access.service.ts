// global modules
import type { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { CasbinService } from 'src/modules/casbin';
import type { DBAccount } from 'src/modules/account';

// local modules
import type {
  DBArticle,
  DBArticleShort,
} from '../repositories/article.db-types';

@Injectable()
export class ArticleAccessService {
  constructor(
    @Inject()
    private readonly casbinSrv: CasbinService,
  ) {}

  canRead(
    account: DBAccount | null,
    article: DBArticle,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read',
      'article',
      article,
    );
  }

  canReadShort(
    account: DBAccount | null,
    articleShort: DBArticleShort,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read',
      'article',
      articleShort,
    );
  }
}
