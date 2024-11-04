// global modules
import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

// common modules
import type { AppAbility } from 'src/types/ability';

// local modules
import type { CaslService } from './casl.types';
import { setUserPermissions } from './casl-ability.ability-builder';

/**
 * Service for handling CASL (Authorization) related operations.
 */
@Injectable()
export class CaslServiceClass implements CaslService {
  constructor() {}

  getAppAbility(user: null): AppAbility {
    const abilityBuilder = new AbilityBuilder<AppAbility>(createMongoAbility);
    setUserPermissions(abilityBuilder, user);
    const res = abilityBuilder.build();

    return res;
  }
}
