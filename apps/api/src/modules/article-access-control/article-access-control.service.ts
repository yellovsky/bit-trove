// global modules
import { Injectable } from '@nestjs/common';
import { Option } from 'effect';
import { subject } from '@casl/ability';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBArticle } from 'src/db-models/article';

// local modules
import type { ArticleAccessControlService } from './article-access-control.types';

@Injectable()
export class ArticleAccessControlServiceClass
  implements ArticleAccessControlService
{
  canReadArticle(
    ctx: AccessControlContext,
    dbArticle: DBArticle,
  ): Option.Option<DBArticle> {
    if (!ctx.can('read', subject('article', dbArticle))) {
      return Option.none();
    }

    return Option.some(dbArticle);
  }
}
