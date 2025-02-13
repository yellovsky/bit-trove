// common modules
import type { AppAbility } from 'src/types/ability';
import type { DBAccount } from 'src/modules/auth';

export interface CaslService {
  getAppAbility(user: DBAccount | null): AppAbility;
}

export const CASL_SRV = 'CASL_SRV';
