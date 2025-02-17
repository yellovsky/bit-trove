// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { CasbinService } from 'src/modules/casbin';
import type { DBAccount } from 'src/modules/account';

// local modules
import type {
  DBBlogPost,
  DBBlogPostShort,
} from '../repositories/blog-post.db-types';

@Injectable()
export class BlogPostAccessService {
  constructor(
    @Inject()
    private readonly casbinSrv: CasbinService,
  ) {}

  canRead<TBlogPost extends DBBlogPost | DBBlogPostShort>(
    account: DBAccount | null,
    blogPost: TBlogPost,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read',
      'blog_post',
      blogPost,
    );
  }

  canReadCMS<TBlogPost extends DBBlogPost | DBBlogPostShort>(
    account: DBAccount | null,
    blogPost: TBlogPost,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read_cms',
      'blog_post',
      blogPost,
    );
  }

  canReadFilter<TBlogPost extends DBBlogPost | DBBlogPostShort>(
    user: DBAccount | null,
    blogPosts: TBlogPost[],
  ): Effect.Effect<Array<TBlogPost | null>, Error> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        this.casbinSrv
          .checkPermission(user?.id, 'read', 'blog_post', blogPost)
          .pipe(Effect.map((allowed) => (allowed ? blogPost : null))),
      ),
    );
  }

  canReadCMSFilter<TBlogPost extends DBBlogPost | DBBlogPostShort>(
    user: DBAccount | null,
    blogPosts: TBlogPost[],
  ): Effect.Effect<Array<TBlogPost | null>, Error> {
    return Effect.all(
      blogPosts.map((blogPost) =>
        this.casbinSrv
          .checkPermission(user?.id, 'read_cms', 'blog_post', blogPost)
          .pipe(Effect.map((allowed) => (allowed ? blogPost : null))),
      ),
    );
  }

  canUpdate<TBlogPost extends DBBlogPost | DBBlogPostShort>(
    account: DBAccount | null,
    blogPost: TBlogPost,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'update',
      'blog_post',
      blogPost,
    );
  }
}
