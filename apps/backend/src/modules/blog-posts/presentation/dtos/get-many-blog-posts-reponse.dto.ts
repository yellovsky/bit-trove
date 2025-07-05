import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { GetManyBlogPostsResponse, ItemsWithPagination } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import type { ExclusionReason } from 'src/shared/excluded';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
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

  constructor(data: ShortBlogPostItemsWithPaginationDto) {
    Object.assign(this, data);
  }
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
    models: BlogPostModel[],
    pagination: ListResponsePaginationDto
  ): Effect.Effect<GetManyBlogPostsResponseDto, ExclusionReason> {
    const skipped: number[] = [];

    return Effect.allSuccesses(
      models.map((model, index) =>
        ShortBlogPostDto.fromModel(model).pipe(
          Effect.tapError(() => {
            skipped.push(index);
            return Effect.void;
          })
        )
      )
    ).pipe(
      Effect.map(
        (items) =>
          new GetManyBlogPostsResponseDto({
            data: new ShortBlogPostItemsWithPaginationDto({
              items,
              pagination: ListResponsePaginationDto.from({ ...pagination, skipped }),
            }),
          })
      )
    );
  }

  constructor(data: Omit<GetManyBlogPostsResponseDto, 'status'>) {
    Object.assign(this, data);
  }
}
