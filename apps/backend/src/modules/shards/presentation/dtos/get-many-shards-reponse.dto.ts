import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { GetManyShardsResponse, ItemsWithPagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import type { ExclusionReason } from 'src/shared/excluded';

import type { ShardModel } from '../../domain/models/shard.model';
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

  constructor(data: ShortShardItemsWithPaginationDto) {
    Object.assign(this, data);
  }
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
    models: ShardModel[],
    pagination: ListResponsePaginationDto
  ): Effect.Effect<GetManyShardsResponseDto, ExclusionReason> {
    const skipped: number[] = [];

    return Effect.allSuccesses(
      models.map((model, index) =>
        ShortShardDto.fromModel(model).pipe(
          Effect.tapError(() => {
            skipped.push(index);
            return Effect.void;
          })
        )
      )
    ).pipe(
      Effect.map(
        (items) =>
          new GetManyShardsResponseDto({
            data: new ShortShardItemsWithPaginationDto({
              items,
              pagination: ListResponsePaginationDto.from({ ...pagination, skipped }),
            }),
          })
      )
    );
  }

  constructor(data: Omit<GetManyShardsResponseDto, 'status'>) {
    this.data = data.data;
  }
}
