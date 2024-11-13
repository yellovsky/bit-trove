// global modules
import { Injectable } from '@nestjs/common';
import { Option } from 'effect';
import { subject } from '@casl/ability';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBArticleAccessControl } from 'src/db-models/article';

// local modules
import type { ArticleAccessControlService } from './article.types';

@Injectable()
export class ArticleAccessControlServiceClass
  implements ArticleAccessControlService
{
  canReadArticle<TArticle extends DBArticleAccessControl>(
    ctx: AccessControlContext,
    dbArticle: TArticle,
  ): Option.Option<TArticle> {
    if (!ctx.can('read', subject('article', dbArticle))) {
      return Option.none();
    }

    return Option.some(dbArticle);
  }
}
