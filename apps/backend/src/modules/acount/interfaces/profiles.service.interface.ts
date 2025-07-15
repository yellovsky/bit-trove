import type { ResultOrExcluded } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ProfileEntity } from '../entities/profile.entity';

export interface ProfilesService {
  getProfileById(txReqCtx: TxRequestContext, id: string): Promise<ResultOrExcluded<ProfileEntity>>;
}

export const PROFILES_SRV = 'PROFILES_SRV' as InjectableIdentifier<ProfilesService>;
