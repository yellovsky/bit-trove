// global modules
import { Effect, HashMap, Option, pipe, String } from 'effect';

export const SRV_LABEL = 'srv';
export const LOG_LABEL = 'label';

export const getSrv = (annotations: HashMap.HashMap<string, unknown>) =>
  pipe(annotations, HashMap.get(SRV_LABEL), Option.filter(String.isString), Option.getOrUndefined);

export const getLabel = (annotations: HashMap.HashMap<string, unknown>) =>
  pipe(annotations, HashMap.get(LOG_LABEL), Option.filter(String.isString), Option.getOrUndefined);

export const annotateSrv =
  (srv: string | undefined) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    srv === undefined ? effect : pipe(effect, Effect.annotateLogs({ [SRV_LABEL]: srv }));

export const annotateLabel =
  (label: string | undefined) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    label === undefined ? effect : pipe(effect, Effect.annotateLogs({ [LOG_LABEL]: label }));
