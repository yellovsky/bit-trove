// common modules
import type { DBAccountSelect } from 'src/db/schema';

export interface DBAccountWithPWDHash extends DBAccountSelect {}
export interface DBAccount extends Omit<DBAccountSelect, 'pwd_hash'> {}
