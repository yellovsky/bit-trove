// local modules
import type { ItemResponse } from './response';

export interface Profile {
  id: string;
}

export type ProfileResponse = ItemResponse<Profile>;
