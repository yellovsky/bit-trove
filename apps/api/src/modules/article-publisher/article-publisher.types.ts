// global modules
import { Option } from 'effect';

// common modules
import type { DBArticle } from 'src/db-models/article';

export interface ArticlePublisherService {
  checkArticle(
    published: boolean | 'published',
    dbArticle: DBArticle,
  ): Option.Option<DBArticle>;
}

export const ARTICLE_PUBLISHER_SRV = 'ARTICLE_PUBLISHER_SRV';
