// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostResponse } from '@repo/api-models';

// local modules
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostResponseEntity implements BlogPostResponse {
  @ApiProperty({ type: BlogPostEntity })
  data: BlogPostResponse['data'];

  constructor(response: BlogPostResponseEntity) {
    this.data = response.data;
  }
}
