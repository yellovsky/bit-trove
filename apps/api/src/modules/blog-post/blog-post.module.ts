// global modules
import { Module } from '@nestjs/common';

// common modules
import { BlogPostRepositoryModule } from 'src/modules/blog-post-repository';

// local modules
import { BLOG_POST_SERVICE } from './blog-post.types';
import { BlogPostServiceClass } from './blog-post.service';

@Module({
  exports: [{ provide: BLOG_POST_SERVICE, useClass: BlogPostServiceClass }],
  imports: [BlogPostRepositoryModule],
  providers: [{ provide: BLOG_POST_SERVICE, useClass: BlogPostServiceClass }],
})
export class BlogPostModule {}
