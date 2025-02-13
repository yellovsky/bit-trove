// global modules
import { Either, pipe } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticlePublishingService } from 'src/modules/article';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import type { PublishingFilter } from 'src/types/publishing-filter';
import { type ApiError, NotFoundAPIError } from 'src/exceptions';

// local modules
import type { DBBlogPostPublishing } from '../repositories/blog-post.db-models';

@Injectable()
export class BlogPostPublishingrService {
  constructor(
    @Inject()
    private readonly articlePublisherSrv: ArticlePublishingService,
  ) {}

  checkBlogPost<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPost: TBlogPost,
  ): Either.Either<TBlogPost, ApiError> {
    if (publishingFilter !== 'published') return Either.right(dbBlogPost);
    if (!dbBlogPost.published_at) Either.left(new NotFoundAPIError({}));

    return this.articlePublisherSrv
      .checkArticle(publishingFilter, dbBlogPost.article)
      .pipe(Either.map((article) => ({ ...dbBlogPost, article })));
  }

  checkReadBlogPostItems<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPostList: Array<TBlogPost | null>,
  ): Either.Either<Array<TBlogPost | null>> {
    const items = dbBlogPostList.map((dbBlogPost) =>
      !dbBlogPost
        ? null
        : pipe(
            this.checkBlogPost(publishingFilter, dbBlogPost),
            Either.getOrElse(() => null),
          ),
    );

    return Either.right(items);
  }

  checkReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostPublishing>(
    publishingFilter: PublishingFilter,
    dbBlogPostList: ItemsWithTotal<TBlogPost | null>,
  ): Either.Either<ItemsWithTotal<TBlogPost | null>> {
    return this.checkReadBlogPostItems(
      publishingFilter,
      dbBlogPostList.items,
    ).pipe(Either.map((items) => ({ items, total: dbBlogPostList.total })));
  }
}
