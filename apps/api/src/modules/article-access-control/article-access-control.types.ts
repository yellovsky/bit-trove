// global modules
import { Option } from 'effect';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBArticleAccessControl } from 'src/db-models/article';

export interface ArticleAccessControlService {
  canReadArticle<TArticle extends DBArticleAccessControl>(
    ctx: AccessControlContext,
    dbArticle: TArticle,
  ): Option.Option<TArticle>;
}

export const ARTICLE_ACCESS_CONTROL_SRV = 'ARTICLE_ACCESS_CONTROL_SRV';
