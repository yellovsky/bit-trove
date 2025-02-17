// global modules
import { Effect } from 'effect';
import { ForbiddenException, Injectable } from '@nestjs/common';

// common modules
import type { DBAccount } from 'src/modules/account';
import type { PublishingFilter } from 'src/types/publishing-filter';

// local modules
import type {
  DBArticle,
  DBArticleShort,
} from '../repositories/article.db-types';

@Injectable()
export class ArticleObfuscationService {
  obfuscateShort(
    _account: DBAccount | null,
    publishingFilter: PublishingFilter,
    articleShort: DBArticleShort,
  ): Effect.Effect<DBArticleShort, Error> {
    return Effect.gen(this, function* () {
      return publishingFilter === 'published' && !articleShort.published_at
        ? yield* Effect.fail(new ForbiddenException())
        : articleShort;
    });
  }

  obfuscate(
    _account: DBAccount | null,
    publishingFilter: PublishingFilter,
    article: DBArticle,
  ): Effect.Effect<DBArticle, Error> {
    return Effect.gen(this, function* () {
      return publishingFilter === 'published' && !article.published_at
        ? yield* Effect.fail(new ForbiddenException())
        : article;
    });
  }
}
