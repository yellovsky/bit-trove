// global modules
import { Module } from '@nestjs/common';

// common modules
import { CasbinModule } from 'src/modules/casbin';
import { DrizzleModule } from 'src/modules/drizzle';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { CMSPermissionPoliciesV1Controller } from './controllers/cms-permission-policies.controller-v1';
import { PermissionPolicyAccessService } from './services/permission-policy-access.service';
import { PermissionPolicyRepository } from './repositories/permission-policy.repository';
import { PermissionPolicySerializerService } from './services/permission-policy-serializer.service';
import { PermissionPolicyService } from './services/permission-policy.service';

@Module({
  controllers: [CMSPermissionPoliciesV1Controller],
  imports: [DrizzleModule, RuntimeModule, CasbinModule],
  providers: [
    PermissionPolicyAccessService,
    PermissionPolicySerializerService,
    PermissionPolicyService,
    PermissionPolicyRepository,
  ],
})
export class PermissionPolicyModule {}
