// global modules
import type { IsAuthorizedResponse } from '@repo/api-models';

// common modules
import type { EndpointQFn } from '~/api/endpoint';
import { makeUseQuery } from '~/api/query';

// local modules
import { tokenizeAuthQKey, type TokenizedAuthQKey } from './auth.query-key';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
const IS_AUTHORIZED_QUERY_TOKEN = 'is_authorized';
type IsAuthorizedQKey = TokenizedAuthQKey<typeof IS_AUTHORIZED_QUERY_TOKEN, void>;
const makeIsAuthorizedQKey = tokenizeAuthQKey(IS_AUTHORIZED_QUERY_TOKEN)<void>;

// ============================================================================
//                           E N D P O I N T
// ============================================================================
const fetchIsAuthorizedQEP: EndpointQFn<IsAuthorizedResponse, IsAuthorizedQKey> =
  apiClient =>
  ({ signal }) =>
    apiClient.get<IsAuthorizedResponse>('/v1/auth/is-authorized', {
      signal,
      withCredentials: true,
    });

// =================================================================
//                  U S E   Q U E R Y
// =================================================================
export const useIsAuthorizedQuery = makeUseQuery({
  endpointQFn: fetchIsAuthorizedQEP,
  makeQueryKey: makeIsAuthorizedQKey,
});
