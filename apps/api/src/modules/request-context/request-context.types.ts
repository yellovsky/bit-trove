// global modules
import type { Effect } from 'effect';
import type { Request } from 'express';

// common modules
import type { ApiError } from 'src/exceptions';
import type { RequestContext } from 'src/types/context';

// ====================================================
//              S E R V I C E
// ====================================================
export interface RequestContextService {
  get(request: Request): Effect.Effect<RequestContext, ApiError>;
}
