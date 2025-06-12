import { ApiProperty } from '@nestjs/swagger';

import type { GetManyThoughtsResponse, ItemsWithPagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';

import type { LocalizedShortThoughtModel } from '../../domain/models/localized-short-thought.model';
import { ShortThoughtDto } from './short-thought.dto';

class ShortThoughtItemsWithPaginationDto implements ItemsWithPagination<ShortThoughtDto> {
  @ApiProperty({
    description: 'The items of the response',
    type: [ShortThoughtDto],
  })
  readonly items!: ShortThoughtDto[];

  @ApiProperty({
    description: 'The pagination of the response',
    type: ListResponsePaginationDto,
  })
  readonly pagination!: ListResponsePaginationDto;
}

export class GetManyThoughtsResponseDto implements GetManyThoughtsResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShortThoughtItemsWithPaginationDto;

  static fromModel(
    models: LocalizedShortThoughtModel[],
    pagination: ListResponsePaginationDto
  ): GetManyThoughtsResponseDto {
    return new GetManyThoughtsResponseDto(models, pagination);
  }

  constructor(models: LocalizedShortThoughtModel[], pagination: ListResponsePaginationDto) {
    this.data = {
      items: models.map((model) => ShortThoughtDto.fromModel(model)),
      pagination,
    };
  }
}
