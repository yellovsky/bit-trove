// global modules
import { Either } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import { ArticleAccessControlService } from 'src/modules/article';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { type ApiError, ForbiddenAPIError } from 'src/exceptions';

// local modules
import type { DBBlogPostAccessControl } from '../repositories/blog-post.db-models';

@Injectable()
export class BlogPostAccessControlService {
  constructor(
    @Inject()
    private readonly articleAccessControlSrv: ArticleAccessControlService,
  ) {}

  canReadBlogPost<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPost: TBlogPost,
  ): Either.Either<TBlogPost, ApiError> {
    const canRead =
      ctx.can('read', subject('blog_post', dbBlogPost)) &&
      this.articleAccessControlSrv.canReadArticle(ctx, dbBlogPost.article);

    return !canRead
      ? Either.left(new ForbiddenAPIError({}))
      : Either.right(dbBlogPost);
  }

  canReadBlogPostItems<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostList: Array<TBlogPost | null>,
  ): Either.Either<Array<TBlogPost | null>, ApiError> {
    return Either.all(
      dbBlogPostList.map((item) =>
        !item
          ? Either.right(null)
          : this.canReadBlogPost(ctx, item).pipe(
              Either.orElse(() => Either.right(null)),
            ),
      ),
    );
  }

  canReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Either.Either<ItemsWithTotal<TBlogPost | null>, ApiError> {
    return this.canReadBlogPostItems(ctx, dbBlogPostSegmantList.items).pipe(
      Either.map((items) => ({ items, total: dbBlogPostSegmantList.total })),
    );
  }
}
