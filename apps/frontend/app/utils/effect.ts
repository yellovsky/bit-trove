// global modules
import { runtime } from '~/utils/runtime';
import { Cause, type Effect, Exit } from 'effect';

export const runAsyncEffect = async <TSuccess, TFailure>(
  effect: Effect.Effect<TSuccess, TFailure>,
  signal?: AbortSignal,
): Promise<TSuccess> =>
  new Promise((resolve, reject) => {
    runtime.runPromiseExit(effect, { signal }).then(exit => {
      if (Exit.isSuccess(exit)) resolve(exit.value);
      else if (Cause.isFailType(exit.cause)) reject(exit.cause.error);
      else reject(exit.cause);
    });
  });
