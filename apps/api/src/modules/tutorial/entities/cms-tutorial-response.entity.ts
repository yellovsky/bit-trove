// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { CMSTutorialResponse } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

// local modules
import { CMSTutorialEntity } from './cms-tutorial.entity';

export class CMSTutorialResponseEntity
  extends Entity
  implements CMSTutorialResponse
{
  @ApiProperty({ type: CMSTutorialEntity })
  data: CMSTutorialEntity;

  constructor(response: WithoutEntityType<CMSTutorialResponseEntity>) {
    super();

    this.data = response.data;
  }
}
