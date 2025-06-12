import { ApiProperty } from '@nestjs/swagger';

import type { ThoughtSlugAvailability, ThoughtSlugAvailabilityResponse } from '@repo/api-models';

export class ThoughtSlugAvailabilityDto implements ThoughtSlugAvailability {
  @ApiProperty({
    description: 'Whether the slug is available',
    type: Boolean,
  })
  readonly available!: boolean;

  constructor(data: ThoughtSlugAvailability) {
    Object.assign(this, data);
  }
}

export class CheckThoughtSlugAvailabilityResponseDto implements ThoughtSlugAvailabilityResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ThoughtSlugAvailabilityDto;

  constructor(data: Omit<ThoughtSlugAvailabilityResponse, 'status'>) {
    Object.assign(this, data);
  }
}
