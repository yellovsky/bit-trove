// local modules
import type { ItemResponse } from './response';
import type { Profile } from './profile';

export interface AuthTokens {
  access_token: string;
}

export interface LoginWithEmailFP {
  email: string;
  password: string;
}

export interface LoginResponse extends ItemResponse<Profile> {
  meta: AuthTokens;
}
