import { ApiProperty } from '@nestjs/swagger';

import type { GetManyBlogPostsResponse, ItemsWithPagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';

import type { LocalizedShortBlogPostModel } from '../../domain/models/localized-short-blog-post.model';
import { ShortBlogPostDto } from './short-blog-post.dto';

class ShortBlogPostItemsWithPaginationDto implements ItemsWithPagination<ShortBlogPostDto> {
  @ApiProperty({
    description: 'The items of the response',
    type: [ShortBlogPostDto],
  })
  readonly items!: ShortBlogPostDto[];

  @ApiProperty({
    description: 'The pagination of the response',
    type: ListResponsePaginationDto,
  })
  readonly pagination!: ListResponsePaginationDto;
}

export class GetManyBlogPostsResponseDto implements GetManyBlogPostsResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShortBlogPostItemsWithPaginationDto;

  static fromModel(
    models: LocalizedShortBlogPostModel[],
    pagination: ListResponsePaginationDto
  ): GetManyBlogPostsResponseDto {
    return new GetManyBlogPostsResponseDto(models, pagination);
  }

  constructor(models: LocalizedShortBlogPostModel[], pagination: ListResponsePaginationDto) {
    this.data = {
      items: models.map((model) => ShortBlogPostDto.fromModel(model)),
      pagination,
    };
  }
}
