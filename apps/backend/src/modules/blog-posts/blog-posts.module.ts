import { Module } from '@nestjs/common';

import { BLOG_POST_REPOSITORY } from './domain/repositories/blog-post.repository';

import { BlogPostAccessServiceImpl } from './application/services/blog-post-access.service';
import { BLOG_POST_ACCESS_SRV } from './application/services/blog-post-access.service.interface';
import { CreateBlogPostUseCase } from './application/use-cases/create-blog-post.use-case';
import { GetManyBlogPosstUseCase } from './application/use-cases/get-many-blog-posts.use-case';
import { GetOneBlogPostUseCase } from './application/use-cases/get-one-blog-post.use-case';

import { PrismaBlogPostRepository } from './infrastructure/repositories/blog-post.repository';

import { CasbinModule } from '../casbin';
import { PrismaModule } from '../prisma';
import { BlogPostController } from './presentation/blog-post.controller';

@Module({
  controllers: [BlogPostController],
  imports: [PrismaModule, CasbinModule],
  providers: [
    { provide: BLOG_POST_REPOSITORY, useClass: PrismaBlogPostRepository },
    { provide: BLOG_POST_ACCESS_SRV, useClass: BlogPostAccessServiceImpl },
    CreateBlogPostUseCase,
    GetOneBlogPostUseCase,
    GetManyBlogPosstUseCase,
  ],
})
export class BlogPostsModule {}
