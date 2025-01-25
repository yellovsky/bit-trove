// global modules
import { Layer, Logger, LogLevel, ManagedRuntime } from 'effect';

export type Runtime = ManagedRuntime.ManagedRuntime<never, never>;

export const createRuntime = (logger: Logger.Logger<unknown, void>): Runtime => {
  const appLayer = Layer.merge(
    Logger.minimumLogLevel(LogLevel.Warning),
    Logger.replace(Logger.defaultLogger, logger),
  );

  return ManagedRuntime.make(appLayer);
};
