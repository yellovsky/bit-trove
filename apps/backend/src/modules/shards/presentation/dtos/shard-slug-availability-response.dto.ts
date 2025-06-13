import { ApiProperty } from '@nestjs/swagger';

import type { ShardSlugAvailability, ShardSlugAvailabilityResponse } from '@repo/api-models';

export class ShardSlugAvailabilityDto implements ShardSlugAvailability {
  @ApiProperty({
    description: 'Whether the slug is available',
    type: Boolean,
  })
  readonly available!: boolean;

  constructor(data: ShardSlugAvailability) {
    Object.assign(this, data);
  }
}

export class CheckShardSlugAvailabilityResponseDto implements ShardSlugAvailabilityResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ShardSlugAvailabilityDto;

  constructor(data: Omit<ShardSlugAvailabilityResponse, 'status'>) {
    Object.assign(this, data);
  }
}
