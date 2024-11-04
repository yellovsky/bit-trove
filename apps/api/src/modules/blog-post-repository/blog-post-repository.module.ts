// global modules
import { Module } from '@nestjs/common';

// common modules
import { PrismaModule } from '../prisma';

// local modules
import { BLOG_POST_REPOSITORY } from './blog-post-repository.types';
import { BlogPostRepositoryServiceClass } from './blog-post-repository.service';

@Module({
  exports: [
    { provide: BLOG_POST_REPOSITORY, useClass: BlogPostRepositoryServiceClass },
  ],
  imports: [PrismaModule],
  providers: [
    { provide: BLOG_POST_REPOSITORY, useClass: BlogPostRepositoryServiceClass },
  ],
})
export class BlogPostRepositoryModule {}
