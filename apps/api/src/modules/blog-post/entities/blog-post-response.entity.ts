// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostResponse } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostResponseEntity extends Entity implements BlogPostResponse {
  @ApiProperty({ type: BlogPostEntity })
  data: BlogPostEntity;

  constructor(response: WithoutEntityType<BlogPostResponseEntity>) {
    super();

    this.data = response.data;
  }
}
