// global modules
import { ApiProperty } from '@nestjs/swagger';

import type {
  ListResponseMeta,
  ListResponseMetaPagination,
} from '@repo/api-models';

export class ListResponseMetaPaginationEntity
  implements ListResponseMetaPagination
{
  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: Number })
  offset: number;

  @ApiProperty({ type: Number })
  total: number;

  constructor(data: ListResponseMetaPaginationEntity) {
    this.limit = data.limit;
    this.offset = data.offset;
    this.total = data.total;
  }
}

export class ListResponseMetaEntity implements ListResponseMeta {
  @ApiProperty({ type: ListResponseMetaPaginationEntity })
  pagination: ListResponseMeta['pagination'];

  constructor(data: ListResponseMetaEntity) {
    this.pagination = new ListResponseMetaPaginationEntity(data.pagination);
  }
}
