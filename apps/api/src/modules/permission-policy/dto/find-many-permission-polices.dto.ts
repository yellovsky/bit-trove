// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { GetPermissionPolicyListFP } from '@repo/api-models';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';

// common modules
import { PaginationParamsDTO } from 'src/common/dto/pagination-params.dto';

const FIND_MANY_PERMISSION_POLICIES_SORT = [
  'created_at',
  '-created_at',
] as const;

export class FindManyPermissionsDTO implements GetPermissionPolicyListFP {
  @ValidateNested()
  @Type(() => PaginationParamsDTO)
  @ApiProperty({ type: PaginationParamsDTO })
  page!: PaginationParamsDTO;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsEnum(FIND_MANY_PERMISSION_POLICIES_SORT)
  @ApiProperty({ enum: FIND_MANY_PERMISSION_POLICIES_SORT })
  sort!: GetPermissionPolicyListFP['sort'];
}
