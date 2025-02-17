// global modules
import type { StatusSuccessResponse } from '@repo/api-models';

export class StatusSuccessResponseEntity implements StatusSuccessResponse {
  data: StatusSuccessResponse['data'] = { status: 'success' };
}
