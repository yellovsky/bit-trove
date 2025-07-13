import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { ItemsWithPagination, ShortArticlesGetResponse } from '@repo/api-models';

import { ListResponsePaginationDto } from 'src/shared/dto/list-response-pagination.dto';
import type { ExclusionReason } from 'src/shared/excluded';

import type { ArticleModel } from '../../domain/models/article.model';
import { ShortArticleDto } from './short-article.dto';

class ShortArticleItemsWithPaginationDto implements ItemsWithPagination<ShortArticleDto> {
  @ApiProperty({
    description: 'The items of the response',
    type: [ShortArticleDto],
  })
  readonly items!: ShortArticleDto[];

  @ApiProperty({
    description: 'The pagination of the response',
    type: ListResponsePaginationDto,
  })
  readonly pagination!: ListResponsePaginationDto;

  constructor(data: ShortArticleItemsWithPaginationDto) {
    Object.assign(this, data);
  }
}

export class GetManyArticlesResponseDto implements ShortArticlesGetResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShortArticleItemsWithPaginationDto;

  static fromModel(
    models: ArticleModel[],
    pagination: ListResponsePaginationDto
  ): Effect.Effect<GetManyArticlesResponseDto, ExclusionReason> {
    const skipped: number[] = [];

    return Effect.allSuccesses(
      models.map((model, index) =>
        ShortArticleDto.fromModel(model).pipe(
          Effect.tapError(() => {
            skipped.push(index);
            return Effect.void;
          })
        )
      )
    ).pipe(
      Effect.map(
        (items) =>
          new GetManyArticlesResponseDto({
            data: new ShortArticleItemsWithPaginationDto({
              items,
              pagination: ListResponsePaginationDto.from({ ...pagination, skipped }),
            }),
          })
      )
    );
  }

  constructor(data: Omit<GetManyArticlesResponseDto, 'status'>) {
    Object.assign(this, data);
  }
}
