import { ApiProperty } from '@nestjs/swagger';

import type { GetManyShardsResponse, ItemsWithPagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';

import type { LocalizedShortShardModel } from '../../domain/models/localized-short-shard.model';
import { ShortShardDto } from './short-shard.dto';

class ShortShardItemsWithPaginationDto implements ItemsWithPagination<ShortShardDto> {
  @ApiProperty({
    description: 'The items of the response',
    type: [ShortShardDto],
  })
  readonly items!: ShortShardDto[];

  @ApiProperty({
    description: 'The pagination of the response',
    type: ListResponsePaginationDto,
  })
  readonly pagination!: ListResponsePaginationDto;
}

export class GetManyShardsResponseDto implements GetManyShardsResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShortShardItemsWithPaginationDto;

  static fromModel(
    models: LocalizedShortShardModel[],
    pagination: ListResponsePaginationDto
  ): GetManyShardsResponseDto {
    return new GetManyShardsResponseDto(models, pagination);
  }

  constructor(models: LocalizedShortShardModel[], pagination: ListResponsePaginationDto) {
    this.data = {
      items: models.map((model) => ShortShardDto.fromModel(model)),
      pagination,
    };
  }
}
