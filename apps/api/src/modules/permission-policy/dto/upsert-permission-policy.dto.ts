// global modules
import { IsString } from 'class-validator';
import type { UpsertPermissionPolicyFP } from '@repo/api-models';

// common modules
import { IsNullable } from 'src/utils/dto';

export class UpsertPermissionPolicyDTO implements UpsertPermissionPolicyFP {
  @IsString()
  sub!: string;

  @IsString()
  act!: string;

  @IsString()
  obj_type!: string;

  @IsString()
  cond!: string;

  @IsString()
  @IsNullable()
  note!: string | null;
}
