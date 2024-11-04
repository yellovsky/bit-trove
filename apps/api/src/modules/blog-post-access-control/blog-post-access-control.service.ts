// global modules
import { Option } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBBlogPost } from 'src/db-models/blog-post';

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

  canReadBlogPost(
    ctx: AccessControlContext,
    dbBlogPost: DBBlogPost,
  ): Option.Option<DBBlogPost> {
    const canRead =
      ctx.can('read', subject('blog_post', dbBlogPost)) &&
      this.articleAccessControlSrv.canReadArticle(ctx, dbBlogPost.article);

    return !canRead ? Option.none() : Option.some(dbBlogPost);
  }
}
