// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
import { BlogPostSegmentEntity } from './blog-post-segment.entity';

export class BlogPostListResponseEntity
  extends Entity
  implements BlogPostListResponse
{
  @ApiProperty({ type: [BlogPostSegmentEntity] })
  data: (BlogPostSegmentEntity | null)[];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: ListResponseMetaEntity;

  constructor(response: WithoutEntityType<BlogPostListResponseEntity>) {
    super();

    this.data = response.data;
    this.meta = response.meta;
  }
}
