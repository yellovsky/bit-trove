// global modules
import { Option } from 'effect';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBArticle } from 'src/db-models/article';

export interface ArticleAccessControlService {
  canReadArticle(
    ctx: AccessControlContext,
    dbArticle: DBArticle,
  ): Option.Option<DBArticle>;
}

export const ARTICLE_ACCESS_CONTROL_SRV = 'ARTICLE_ACCESS_CONTROL_SRV';
