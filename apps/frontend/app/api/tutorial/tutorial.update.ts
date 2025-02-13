// global modules
import { Effect } from 'effect';
import type { CMSTutorial, CMSTutorialResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query';

// ============================================================================
//                         Q U E R Y   K E Y
// ============================================================================
export interface UpdateTutorialVariables extends CMSTutorial {
  slug: string;
}

// ============================================================================
//                          E N D P O I N T
// ============================================================================
export const updateTutorialEP: EndpointFn<CMSTutorialResponse, UpdateTutorialVariables> =
  apiClient =>
  ({ variables, signal }) =>
    Effect.gen(function* () {
      console.warn('[updateTutorialEP]', variables);
      const { slug, ...rest } = variables;

      return yield* apiClient.put<CMSTutorialResponse>(`/v1/cms/tutorials/${slug}`, rest, {
        signal,
        withCredentials: true,
      });
    });

// ============================================================================
//                         U S E   M U T A T I O N
// ============================================================================
export const useUpdateTutorialMutation = useEffectMutation({
  endpoint: updateTutorialEP,
});
