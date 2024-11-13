// global modules
import { ApiProperty } from '@nestjs/swagger';

import type {
  ListResponseMeta,
  ListResponseMetaPagination,
} from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/entities/entity';

export class ListResponseMetaPaginationEntity
  extends Entity
  implements ListResponseMetaPagination
{
  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: Number })
  offset: number;

  @ApiProperty({ type: Number })
  total: number;

  constructor(data: WithoutEntityType<ListResponseMetaPaginationEntity>) {
    super();

    this.limit = data.limit;
    this.offset = data.offset;
    this.total = data.total;
  }
}

export class ListResponseMetaEntity extends Entity implements ListResponseMeta {
  @ApiProperty({ type: ListResponseMetaPaginationEntity })
  pagination: ListResponseMetaPagination;

  constructor(data: WithoutEntityType<ListResponseMetaEntity>) {
    super();
    this.pagination = data.pagination;
  }
}
