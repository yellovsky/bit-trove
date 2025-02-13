// global modules
import { Injectable } from '@nestjs/common';

import {
  Effect,
  Logger as EffectLogger,
  Layer,
  LogLevel,
  ManagedRuntime,
} from 'effect';

// local modules
import { makeEffectLogger, makeWinstonLogger } from './runtime.logger';

/**
 * The `Runtime` class provides a managed runtime environment for running effects with logging and error handling.
 * It utilizes a custom logger and allows for log annotation and log level configuration.
 *
 * @class
 * @example
 * ```typescript
 * const runtime = new Runtime();
 * const effect = Effect.succeed("Hello, World!");
 * runtime.runPromise(effect).then(console.log);
 * ```
 */
@Injectable()
export class RuntimeService {
  #runtime: ManagedRuntime.ManagedRuntime<never, never>;

  constructor() {
    const winstonLogger = makeWinstonLogger();
    const logger = makeEffectLogger(winstonLogger);

    const appLayer = Layer.merge(
      EffectLogger.minimumLogLevel(LogLevel.Warning),
      EffectLogger.replace(EffectLogger.defaultLogger, logger),
    );

    this.#runtime = ManagedRuntime.make(appLayer);
  }

  /**
   * Executes the given effect as a promise.
   *
   * @template A - The type of the successful result.
   * @template E - The type of the error result.
   * @param {Effect.Effect<A, E>} effect - The effect to be executed.
   * @param {Object} [options] - Optional configuration for the execution.
   * @param {AbortSignal} [options.signal] - An optional AbortSignal to cancel the execution.
   * @returns {Promise<A>} A promise that resolves with the result of the effect or rejects with an error.
   */
  runPromise<A, E>(
    effect: Effect.Effect<A, E>,
    options?: { readonly signal?: AbortSignal | undefined },
  ) {
    return this.#runtime.runPromise(effect, options);
  }
}
