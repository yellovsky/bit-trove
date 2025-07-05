import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';
import { TagsModule } from 'src/modules/tags';

import { BLOG_POSTS_REPOSITORY } from './domain/repositories/blog-posts.repository';

import { BlogPostAccessServiceImpl } from './application/services/blog-post-access.service';
import { BLOG_POST_ACCESS_SRV } from './application/services/blog-post-access.service.interface';
import { BlogPostsServiceImpl } from './application/services/blog-posts.service';
import { BLOG_POSTS_SRV } from './application/services/blog-posts.service.interface';
import { CheckBlogPostSlugAvailabilityUseCase } from './application/use-cases/check-blog-post-slug-availability.use-case';
import { CreateBlogPostUseCase } from './application/use-cases/create-blog-post.use-case';
import { GetManyBlogPostsUseCase } from './application/use-cases/get-many-blog-posts.use-case';
import { GetMyBlogPostUseCase } from './application/use-cases/get-my-blog-post.use-case';
import { GetMyManyBlogPostsUseCase } from './application/use-cases/get-my-many-blog-posts.use-case';
import { GetOneBlogPostUseCase } from './application/use-cases/get-one-blog-post.use-case';
import { PublishBlogPostUseCase } from './application/use-cases/publish-blog-post.use-case';
import { UnpublishBlogPostUseCase } from './application/use-cases/unpublish-blog-post.use-case';
import { UpdateBlogPostUseCase } from './application/use-cases/update-blog-post.use-case';

import { PrismaBlogPostsRepository } from './infrastructure/repositories/blog-posts.repository';

import { BlogPostController } from './presentation/blog-post.controller';
import { CMSBlogPostsController } from './presentation/cms-blog-posts.controller';
import { MyBlogPostsController } from './presentation/my-blog-posts.controller';

@Module({
  controllers: [BlogPostController, MyBlogPostsController, CMSBlogPostsController],
  exports: [BLOG_POSTS_REPOSITORY],
  imports: [PrismaModule, CasbinModule, TagsModule],
  providers: [
    { provide: BLOG_POSTS_REPOSITORY, useClass: PrismaBlogPostsRepository },
    { provide: BLOG_POST_ACCESS_SRV, useClass: BlogPostAccessServiceImpl },
    { provide: BLOG_POSTS_SRV, useClass: BlogPostsServiceImpl },
    CreateBlogPostUseCase,
    UpdateBlogPostUseCase,
    CheckBlogPostSlugAvailabilityUseCase,
    GetOneBlogPostUseCase,
    GetManyBlogPostsUseCase,
    GetMyBlogPostUseCase,
    GetMyManyBlogPostsUseCase,
    PublishBlogPostUseCase,
    UnpublishBlogPostUseCase,
  ],
})
export class BlogPostsModule {}
