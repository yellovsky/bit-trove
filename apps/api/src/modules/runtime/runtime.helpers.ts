// global modules
import * as R from 'ramda';
import { Effect, Logger, type LogLevel, pipe } from 'effect';

/**
 * Annotates logs for a given effect with service information and an optional label and log level.
 *
 * @param srv - An object containing the service name.
 * @param label - An optional label to annotate the logs with.
 * @param logLevel - An optional log level to set the minimum log level for logging.
 * @returns A function that takes an effect and returns the effect with annotated logs.
 */
export const annotateLogs =
  (srv: { name: string }, label?: string, logLevel?: LogLevel.LogLevel) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    pipe(
      effect,
      Effect.annotateLogs({ label, srv }),
      logLevel ? Logger.withMinimumLogLevel(logLevel) : R.identity,
    );
