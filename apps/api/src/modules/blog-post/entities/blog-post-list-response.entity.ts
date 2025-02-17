// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostListResponse } from '@repo/api-models';

// common modules
import { ListResponseMetaEntity } from 'src/common/entities/response';

// local modules
import { BlogPostShortEntity } from './blog-post-short.entity';

export class BlogPostListResponseEntity implements BlogPostListResponse {
  @ApiProperty({ type: [BlogPostShortEntity] })
  data: BlogPostListResponse['data'];

  @ApiProperty({ type: [ListResponseMetaEntity] })
  meta: ListResponseMetaEntity;

  constructor(response: BlogPostListResponseEntity) {
    this.data = response.data;
    this.meta = response.meta;
  }
}
