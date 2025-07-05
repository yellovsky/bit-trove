import { ApiProperty } from '@nestjs/swagger';

import type { BlogPostSlugAvailability, BlogPostSlugAvailabilityResponse } from '@repo/api-models';

export class BlogPostSlugAvailabilityDto implements BlogPostSlugAvailability {
  @ApiProperty({
    description: 'Whether the slug is available',
    type: Boolean,
  })
  readonly available!: boolean;

  @ApiProperty({
    description: 'The ID of the blog post that is taking the slug',
    type: String,
  })
  readonly takenBy?: string;

  constructor(data: BlogPostSlugAvailability) {
    Object.assign(this, data);
  }
}

export class CheckBlogPostSlugAvailabilityResponseDto implements BlogPostSlugAvailabilityResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: BlogPostSlugAvailabilityDto;

  constructor(data: Omit<BlogPostSlugAvailabilityResponse, 'status'>) {
    Object.assign(this, data);
  }
}
