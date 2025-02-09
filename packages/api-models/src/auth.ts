// local modules
import type { ItemResponse } from './response';

export interface LoginWithEmailFP {
  email: string;
  password: string;
}

export type IsAuthorizedResponse = ItemResponse<{ isAuthorized: boolean }>;
