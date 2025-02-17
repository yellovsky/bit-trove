// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticleTranslationService } from 'src/modules/article';
import type { GetTranslationsStrategy } from 'src/utils/translation-strategy';

// local modules
import type {
  DBBlogPost,
  DBBlogPostShort,
} from '../repositories/blog-post.db-types';

@Injectable()
export class BlogPostTranslationService {
  constructor(
    @Inject()
    private readonly articleTranslationSrv: ArticleTranslationService,
  ) {}

  translateShort(
    translationStrategy: GetTranslationsStrategy,
    blogPostShort: DBBlogPostShort,
  ): Effect.Effect<DBBlogPostShort, Error> {
    return Effect.gen(this, function* () {
      return {
        ...blogPostShort,
        article: yield* this.articleTranslationSrv.translateShort(
          translationStrategy,
          blogPostShort.article,
        ),
      };
    });
  }

  translate(
    translationStrategy: GetTranslationsStrategy,
    blogPost: DBBlogPost,
  ): Effect.Effect<DBBlogPost, Error> {
    return Effect.gen(this, function* () {
      return {
        ...blogPost,
        article: yield* this.articleTranslationSrv.translate(
          translationStrategy,
          blogPost.article,
        ),
      };
    });
  }

  translateShortList(
    translationStrategy: GetTranslationsStrategy,
    blogPosts: Array<DBBlogPostShort | null>,
  ): Effect.Effect<Array<DBBlogPostShort | null>, Error> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        !blogPost
          ? Effect.succeed(null)
          : this.translateShort(translationStrategy, blogPost),
      ),
    );
  }
}
