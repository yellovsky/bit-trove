// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { CMSTutorialResponse } from '@repo/api-models';

// local modules
import { CMSTutorialEntity } from './cms-tutorial.entity';

export class CMSTutorialResponseEntity implements CMSTutorialResponse {
  @ApiProperty({ type: CMSTutorialEntity })
  data: CMSTutorialResponse['data'];

  constructor(response: CMSTutorialResponseEntity) {
    this.data = new CMSTutorialEntity(response.data);
  }
}
