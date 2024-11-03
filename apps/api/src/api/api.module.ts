// global modules
import { Module } from '@nestjs/common';

// local modules
import { BlogPostsApiModule } from './blog-posts';

@Module({
  imports: [BlogPostsApiModule],
})
export class ApiModule {}
