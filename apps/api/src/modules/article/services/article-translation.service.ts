// global modules
import { Effect } from 'effect';
import { Injectable, NotFoundException } from '@nestjs/common';

// common modules
import type { GetTranslationsStrategy } from 'src/utils/translation-strategy';
import { type DBArticle, type DBArticleShort } from 'src/modules/article';

@Injectable()
export class ArticleTranslationService {
  constructor() {}

  translateShort(
    translationStrategy: GetTranslationsStrategy,
    articleShort: DBArticleShort,
  ): Effect.Effect<DBArticleShort, Error> {
    return Effect.gen(function* () {
      const translations = translationStrategy(articleShort);

      return !translations
        ? yield* Effect.fail(new NotFoundException())
        : { ...articleShort, translations: [translations] };
    });
  }

  translate(
    translationStrategy: GetTranslationsStrategy,
    article: DBArticle,
  ): Effect.Effect<DBArticle, Error> {
    return Effect.gen(function* () {
      const translations = translationStrategy(article);

      return !translations
        ? yield* Effect.fail(new NotFoundException())
        : { ...article, translations: [translations] };
    });
  }

  translateShortList(
    translationStrategy: GetTranslationsStrategy,
    articles: Array<DBArticleShort | null>,
  ): Effect.Effect<Array<DBArticleShort | null>, Error> {
    return Effect.all(
      articles.map((article) =>
        !article
          ? Effect.succeed(null)
          : this.translateShort(translationStrategy, article),
      ),
    );
  }
}
