import type { Enforcer } from 'casbin';
import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { SkippedOr } from 'src/shared/utils/load-result';
import type { AuthRequestContext, RequestContext } from 'src/shared/utils/request-context';

import type { PermissionPolicyEntity } from '../entities/permission-policy.entity';
import type { CasbinAction, CasbinObjectType, CasbinSubject } from './casbin-rule.interfaces';

export interface GetPoliciesListParams {
  page: { limit: number; offset: number };
}

export interface CasbinService {
  getEnforcer(): Enforcer;

  checkRequestPermission(
    reqCtx: AuthRequestContext,
    action: CasbinAction,
    objType: CasbinObjectType,
    obj: object
  ): Effect.Effect<true, ExclusionReason | UnknownException>;

  checkPermission(sub: CasbinSubject, action: CasbinAction, objType: CasbinObjectType, obj: object): Promise<boolean>;

  getManyPolicies(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<SkippedOr<PermissionPolicyEntity>[]>;

  getPoliciesTotal(reqCtx: RequestContext, params: GetPoliciesListParams): Promise<number>;

  getManyPoliciesWithTotal(
    reqCtx: RequestContext,
    params: GetPoliciesListParams
  ): Promise<{ items: SkippedOr<PermissionPolicyEntity>[]; total: number }>;
}

export const CASBIN_SRV = 'CASBIN_SRV' as InjectableIdentifier<CasbinService>;
