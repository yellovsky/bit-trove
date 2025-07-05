import { Module } from '@nestjs/common';

import { BLOG_POST_REPOSITORY } from './domain/repositories/blog-post.repository';

import { BlogPostAccessServiceImpl } from './application/services/blog-post-access.service';
import { BLOG_POST_ACCESS_SRV } from './application/services/blog-post-access.service.interface';
import { CheckBlogPostSlugAvailabilityUseCase } from './application/use-cases/check-blog-post-slug-availability.use-case';
import { CreateBlogPostUseCase } from './application/use-cases/create-blog-post.use-case';
import { GetManyBlogPosstUseCase } from './application/use-cases/get-many-blog-posts.use-case';
import { GetOneBlogPostUseCase } from './application/use-cases/get-one-blog-post.use-case';
import { UpdateBlogPostUseCase } from './application/use-cases/update-blog-post.use-case';

import { PrismaBlogPostRepository } from './infrastructure/repositories/blog-post.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { BlogPostController } from './presentation/blog-post.controller';

@Module({
  controllers: [BlogPostController],
  exports: [BLOG_POST_REPOSITORY],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: BLOG_POST_REPOSITORY, useClass: PrismaBlogPostRepository },
    { provide: BLOG_POST_ACCESS_SRV, useClass: BlogPostAccessServiceImpl },
    CreateBlogPostUseCase,
    UpdateBlogPostUseCase,
    CheckBlogPostSlugAvailabilityUseCase,
    GetOneBlogPostUseCase,
    GetManyBlogPosstUseCase,
  ],
})
export class BlogPostsModule {}
