// global modules
import { Either } from 'effect';
import { Injectable } from '@nestjs/common';

// common modules
import type { DBArticlePublishing } from 'src/db-models/article';
import type { PublishingFilter } from 'src/types/publishing-filter';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';

// local modules
import type { ArticlePublishingService } from './article.types';

@Injectable()
export class ArticlePublishingServiceClass implements ArticlePublishingService {
  checkArticle<TArticle extends DBArticlePublishing>(
    publishingFilter: PublishingFilter,
    dbArticle: TArticle,
  ): Either.Either<TArticle, ApiError> {
    if (publishingFilter !== 'published') return Either.right(dbArticle);
    if (!dbArticle.published_at) return Either.left(new NotFoundAPIError({}));

    const publishedTranslations = dbArticle.translations.filter(
      (translations) => !!translations.published_at,
    );

    if (!publishedTranslations.length)
      return Either.left(new NotFoundAPIError({}));

    return Either.right({
      ...dbArticle,
      translations: publishedTranslations,
    });
  }
}
