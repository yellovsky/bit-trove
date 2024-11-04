// global modules
import { Injectable } from '@nestjs/common';
import { Option } from 'effect';

// common modules
import type { DBArticle } from 'src/db-models/article';

// local modules
import type { ArticlePublisherService } from './article-publisher.types';

@Injectable()
export class ArticlePublisherServiceClass implements ArticlePublisherService {
  checkArticle(
    published: boolean | 'published',
    dbArticle: DBArticle,
  ): Option.Option<DBArticle> {
    if (!published) return Option.some(dbArticle);

    if (!dbArticle.published_at) return Option.none();

    const publishedTranslations = dbArticle.translations.filter(
      (translations) => !!translations.published_at,
    );

    if (!publishedTranslations.length) return Option.none();

    return Option.some({
      ...dbArticle,
      translations: publishedTranslations,
    });
  }
}
