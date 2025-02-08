// common modules
import type { AppAbility } from 'src/types/ability';
import type { DBUser } from 'src/db-models/user';

export interface CaslService {
  getAppAbility(user: DBUser | null): AppAbility;
}

export const CASL_SRV = 'CASL_SRV';
