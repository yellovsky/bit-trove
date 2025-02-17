// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { TutorialResponse } from '@repo/api-models';

// local modules
import { TutorialEntity } from './tutorial.entity';

export class TutorialResponseEntity implements TutorialResponse {
  @ApiProperty({ type: TutorialEntity })
  data: TutorialResponse['data'];

  constructor(response: TutorialResponseEntity) {
    this.data = new TutorialEntity(response.data);
  }
}
