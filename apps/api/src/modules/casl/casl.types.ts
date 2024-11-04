// common modules
import type { AppAbility } from 'src/types/ability';

export interface CaslService {
  getAppAbility(user: null): AppAbility;
}

export const CASL_SRV = 'CASL_SRV';
