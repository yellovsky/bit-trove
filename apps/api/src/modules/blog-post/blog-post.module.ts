// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';
import { RequestContextModule } from 'src/modules/request-context';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { BlogPostAccessControlService } from './services/blog-post-access-control.service';
import { BlogPostPublishingrService } from './services/blog-post-publishing.service';
import { BlogPostRepositoryService } from './repositories/blog-post.repository';
import { BlogPostService } from './services/blog-post.service';
import { BlogPostsV1Controller } from './controllers/blog-posts.controller-v1';

@Module({
  controllers: [BlogPostsV1Controller],
  exports: [BlogPostService],
  imports: [RuntimeModule, RequestContextModule, PrismaModule, ArticleModule],
  providers: [
    BlogPostRepositoryService,
    BlogPostAccessControlService,
    BlogPostPublishingrService,
    BlogPostService,
  ],
})
export class BlogPostModule {}
