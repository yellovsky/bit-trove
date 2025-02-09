// global modules
import type { StatusSuccessResponse } from '@repo/api-models';

// common modules
import { Entity } from 'src/entities/entity';

export class StatusSuccessResponseEntity
  extends Entity
  implements StatusSuccessResponse
{
  data: StatusSuccessResponse['data'] = { status: 'success' };

  constructor() {
    super();
  }
}
