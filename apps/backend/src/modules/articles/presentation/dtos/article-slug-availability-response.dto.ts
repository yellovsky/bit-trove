import { ApiProperty } from '@nestjs/swagger';

import type { ArticleSlugAvailability, ArticleSlugAvailabilityResponse } from '@repo/api-models';

export class ArticleSlugAvailabilityDto implements ArticleSlugAvailability {
  @ApiProperty({
    description: 'Whether the slug is available',
    type: Boolean,
  })
  readonly available!: boolean;

  @ApiProperty({
    description: 'The ID of the article that is taking the slug',
    type: String,
  })
  readonly takenBy?: string;

  constructor(data: ArticleSlugAvailability) {
    Object.assign(this, data);
  }
}

export class CheckArticleSlugAvailabilityResponseDto implements ArticleSlugAvailabilityResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ArticleSlugAvailabilityDto;

  constructor(data: Omit<ArticleSlugAvailabilityResponse, 'status'>) {
    Object.assign(this, data);
  }
}
