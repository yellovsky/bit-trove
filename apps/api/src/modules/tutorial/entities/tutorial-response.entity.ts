// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { TutorialResponse } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
import { TutorialEntity } from './tutorial.entity';

export class TutorialResponseEntity extends Entity implements TutorialResponse {
  @ApiProperty({ type: TutorialEntity })
  data: TutorialEntity;

  constructor(response: WithoutEntityType<TutorialResponseEntity>) {
    super();

    this.data = response.data;
  }
}
