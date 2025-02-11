// global modules
import { Effect } from 'effect';
import type { CMSTutorial, TutorialResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
export type UpdateTutorialVariables = CMSTutorial;

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const updateTutorialEP: EndpointFn<TutorialResponse, UpdateTutorialVariables> =
  () =>
  ({ variables }) =>
    Effect.gen(function* () {
      console.warn('[updateTutorialEP]', variables);
      return yield* Effect.fail({
        error: { error_name: 'internal_server_error' as const, status_code: 501 },
        meta: { status: 501 },
      });
    });

// ============================================================================
//                         U S E   M U T A T I O N
// ============================================================================
export const useUpdateTutorialMutation = useEffectMutation({
  endpoint: updateTutorialEP,
});
