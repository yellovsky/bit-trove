import { Inject } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import type { UnknownException } from 'effect/Cause';
import { validate as isUUID } from 'uuid';

import type { ExclusionReason } from 'src/shared/excluded';
import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BLOG_POSTS_REPOSITORY } from '../../domain/repositories/blog-posts.repository';
import { BLOG_POST_ACCESS_SRV } from './blog-post-access.service.interface';
import type {
  BlogPostsService,
  CreateBlogPostParams,
  GetBlogPostByIdParams,
  GetBlogPostBySlugOrIdParams,
  GetBlogPostBySlugParams,
  GetManyBlogPostsParams,
  UpdateBlogPostParams,
} from './blog-posts.service.interface';

export class BlogPostsServiceImpl implements BlogPostsService {
  constructor(
    @Inject(BLOG_POST_ACCESS_SRV)
    private readonly blogPostsAccessSrv: IdentifierOf<typeof BLOG_POST_ACCESS_SRV>,

    @Inject(BLOG_POSTS_REPOSITORY)
    private readonly repository: IdentifierOf<typeof BLOG_POSTS_REPOSITORY>
  ) {}

  getBlogPostById(
    reqCtx: RequestContext,
    params: GetBlogPostByIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneBlogPostById(reqCtx, params),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.filterCanReadBlogPost(reqCtx, blogPost))
    );
  }

  getBlogPostBySlug(
    reqCtx: RequestContext,
    params: GetBlogPostBySlugParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findOneBlogPostBySlug(reqCtx, params),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.filterCanReadBlogPost(reqCtx, blogPost))
    );
  }

  getBlogPostBySlugOrId(
    reqCtx: RequestContext,
    params: GetBlogPostBySlugOrIdParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return isUUID(params.slugOrId)
      ? this.getBlogPostById(reqCtx, { id: params.slugOrId, published: params.published })
      : this.getBlogPostBySlug(reqCtx, { published: params.published, slug: params.slugOrId });
  }

  getManyBlogPosts(
    reqCtx: RequestContext,
    params: GetManyBlogPostsParams
  ): Effect.Effect<Array<BlogPostModel | ExclusionReason>, ExclusionReason | UnknownException> {
    return pipe(
      this.repository.findManyBlogPosts(reqCtx, params),
      Effect.flatMap((items) => this.blogPostsAccessSrv.filterCanReadBlogPostList(reqCtx, items))
    );
  }

  createBlogPost(
    reqCtx: RequestContext,
    body: CreateBlogPostParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.blogPostsAccessSrv.canCreateBlogPost(reqCtx),
      Effect.flatMap(() => this.repository.createBlogPost(reqCtx, body))
    );
  }

  updateBlogPost(
    reqCtx: RequestContext,
    id: string,
    body: UpdateBlogPostParams
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getBlogPostById(reqCtx, { id }),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.canUpdateBlogPost(reqCtx, blogPost)),
      Effect.flatMap(() => this.repository.updateBlogPost(reqCtx, id, body))
    );
  }

  publishBlogPost(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getBlogPostById(reqCtx, { id }),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.canUpdateBlogPost(reqCtx, blogPost)),
      Effect.flatMap(() => this.repository.setBlogPostPublished(reqCtx, id, true)),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.filterCanReadBlogPost(reqCtx, blogPost))
    );
  }

  unpublishBlogPost(
    reqCtx: RequestContext,
    id: string
  ): Effect.Effect<BlogPostModel, ExclusionReason | UnknownException> {
    return pipe(
      this.getBlogPostById(reqCtx, { id }),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.canUpdateBlogPost(reqCtx, blogPost)),
      Effect.flatMap(() => this.repository.setBlogPostPublished(reqCtx, id, false)),
      Effect.flatMap((blogPost) => this.blogPostsAccessSrv.filterCanReadBlogPost(reqCtx, blogPost))
    );
  }
}
