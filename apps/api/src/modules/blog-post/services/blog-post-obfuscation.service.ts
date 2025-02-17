// global modules
import { Effect } from 'effect';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticleObfuscationService } from 'src/modules/article';
import type { DBAccount } from 'src/modules/account';
import type { PublishingFilter } from 'src/types/publishing-filter';

// local modules
import type {
  DBBlogPost,
  DBBlogPostShort,
} from '../repositories/blog-post.db-types';

@Injectable()
export class BlogPostObfuscationService {
  constructor(
    @Inject()
    private readonly articleObfuscationSrv: ArticleObfuscationService,
  ) {}

  obfuscateShortList(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    blogPosts: Array<DBBlogPostShort | null>,
  ): Effect.Effect<Array<DBBlogPostShort | null>, Error> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        !blogPost
          ? Effect.succeed(null)
          : this.obfuscateShort(account, publishingFilter, blogPost),
      ),
    );
  }

  obfuscateShort(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    blogPostShort: DBBlogPostShort,
  ): Effect.Effect<DBBlogPostShort, Error> {
    return Effect.gen(this, function* () {
      if (publishingFilter === 'published' && !blogPostShort.published_at) {
        return yield* Effect.fail(new ForbiddenException());
      }

      return {
        ...blogPostShort,
        article: yield* this.articleObfuscationSrv.obfuscateShort(
          account,
          publishingFilter,
          blogPostShort.article,
        ),
      };
    });
  }

  obfuscate(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    blogPost: DBBlogPost,
  ): Effect.Effect<DBBlogPost, Error> {
    return Effect.gen(this, function* () {
      if (publishingFilter === 'published' && !blogPost.published_at) {
        return yield* Effect.fail(new ForbiddenException());
      }

      return {
        ...blogPost,
        article: yield* this.articleObfuscationSrv.obfuscate(
          account,
          publishingFilter,
          blogPost.article,
        ),
      };
    });
  }
}
