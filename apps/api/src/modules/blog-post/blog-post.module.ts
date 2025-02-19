// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { CasbinModule } from 'src/modules/casbin';
import { DrizzleModule } from 'src/modules/drizzle';
import { PrismaModule } from 'src/modules/prisma';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { BlogPostAccessService } from './services/blog-post-access.service';
import { BlogPostObfuscationService } from './services/blog-post-obfuscation.service';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { BlogPostSerializerService } from './services/blog-post-serializer.service';
import { BlogPostService } from './services/blog-post.service';
import { BlogPostsV1Controller } from './controllers/blog-posts.controller-v1';
import { BlogPostTranslationService } from './services/blog-post-translation.service';

@Module({
  controllers: [BlogPostsV1Controller],
  exports: [BlogPostService],
  imports: [
    DrizzleModule,
    CasbinModule,
    RuntimeModule,
    PrismaModule,
    ArticleModule,
  ],
  providers: [
    BlogPostRepository,
    BlogPostService,
    BlogPostAccessService,
    BlogPostObfuscationService,
    BlogPostTranslationService,
    BlogPostSerializerService,
  ],
})
export class BlogPostModule {}
