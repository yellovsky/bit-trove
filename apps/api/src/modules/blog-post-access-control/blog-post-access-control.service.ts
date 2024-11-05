// global modules
import { Option } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBBlogPostAccessControl } from 'src/db-models/blog-post';
import type { ItemsWithTotal } from 'src/types/items-with-total';

import {
  ARTICLE_ACCESS_CONTROL_SRV,
  type ArticleAccessControlService,
} from 'src/modules/article-access-control';

@Injectable()
export class BlogPostAccessControlServiceClass {
  constructor(
    @Inject(ARTICLE_ACCESS_CONTROL_SRV)
    private readonly articleAccessControlSrv: ArticleAccessControlService,
  ) {}

  canReadBlogPost<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPost: TBlogPost,
  ): Option.Option<TBlogPost> {
    const canRead =
      ctx.can('read', subject('blog_post', dbBlogPost)) &&
      this.articleAccessControlSrv.canReadArticle(ctx, dbBlogPost.article);

    return !canRead ? Option.none() : Option.some(dbBlogPost);
  }

  canReadBlogPostItems<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostList: Array<TBlogPost | null>,
  ): Option.Option<Array<TBlogPost | null>> {
    return Option.all(
      dbBlogPostList.map((dbBlogPost) =>
        dbBlogPost
          ? this.canReadBlogPost(ctx, dbBlogPost).pipe(
              Option.orElseSome(() => null),
            )
          : Option.some(null),
      ),
    ).pipe(
      Option.flatMap((arr) =>
        arr.every((item) => item === null) ? Option.none() : Option.some(arr),
      ),
    );
  }

  canReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostAccessControl>(
    ctx: AccessControlContext,
    dbBlogPostSegmantList: ItemsWithTotal<TBlogPost | null>,
  ): Option.Option<ItemsWithTotal<TBlogPost | null>> {
    return this.canReadBlogPostItems(ctx, dbBlogPostSegmantList.items).pipe(
      Option.map((items) => ({ items, total: dbBlogPostSegmantList.total })),
    );
  }
}
