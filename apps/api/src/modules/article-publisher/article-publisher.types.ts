// global modules
import { Option } from 'effect';

// common modules
import type { DBArticlePublishing } from 'src/db-models/article';

export interface ArticlePublisherService {
  checkArticle<TArticle extends DBArticlePublishing>(
    published: boolean | 'published',
    dbArticle: TArticle,
  ): Option.Option<TArticle>;
}

export const ARTICLE_PUBLISHER_SRV = 'ARTICLE_PUBLISHER_SRV';
