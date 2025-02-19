// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { GetPermissionPolicyResponse } from '@repo/api-models';

// local modules
import { PermissionPolicyEntity } from './permission-policy.entity';

export class PermissionPolicyResponseEntity
  implements GetPermissionPolicyResponse
{
  @ApiProperty({ type: PermissionPolicyEntity })
  data: GetPermissionPolicyResponse['data'];

  constructor(response: PermissionPolicyResponseEntity) {
    this.data = response.data;
  }
}
