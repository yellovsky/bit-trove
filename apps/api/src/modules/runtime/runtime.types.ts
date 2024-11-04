// global modules
import { Effect } from 'effect';

export interface RuntimeService {
  runPromise<A, E>(
    effect: Effect.Effect<A, E>,
    options?: { readonly signal?: AbortSignal | undefined },
  ): Promise<A>;
}

export const RUNTIME_SRV = 'RUNTIME_SRV';
