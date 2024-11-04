// global modules
import * as R from 'ramda';
import winston from 'winston';

import {
  Logger as EffectLogger,
  HashMap,
  LogLevel,
  Option,
  pipe,
  String,
} from 'effect';

// local modules
import { availableConsoleColors, colorsMap } from './runtime.logger-colors';

export const makeWinstonLogger = () => {
  winston.addColors(colorsMap);
  const colorizer = winston.format.colorize();

  const stringToHash = (str: string) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }

    // Ensure the hash is non-negative and apply the max value constraint
    return Math.abs(hash) % availableConsoleColors.length;
  };

  const consoleFormat = winston.format.printf(
    ({ level, message, label, timestamp, srv }) => {
      const srvName = srv;

      const combinedLabel = [srvName ? `@${srvName}` : undefined, label]
        .filter(Boolean)
        .join('.');

      const colorizedLevel = !combinedLabel
        ? combinedLabel
        : colorizer.colorize(
            `srv-${stringToHash(srvName)}`,
            ` ${combinedLabel} `,
          );

      return (
        [timestamp, level, `${colorizedLevel}`].filter(Boolean).join(' ') +
        `: ${message}`
      );
    },
  );

  return winston.createLogger({
    level: 'debug',
    transports: [new winston.transports.Console()],

    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.prettyPrint(),
      winston.format.simple(),
      consoleFormat,
    ),
  });
};

const SRV_LABEL = 'srv';
const LOG_LABEL = 'label';

const getLogLabel = (hashMap: HashMap.HashMap<string, unknown>) =>
  pipe(
    hashMap,
    HashMap.get(LOG_LABEL),
    Option.filter(String.isString),
    Option.getOrUndefined,
  );

const getSrvName = (hashMap: HashMap.HashMap<string, unknown>) =>
  pipe(
    hashMap,
    HashMap.get(SRV_LABEL),
    Option.map(R.path(['name'])),
    Option.filter(String.isString),
    Option.getOrUndefined,
  );

export const makeEffectLogger = (winstonLogger: winston.Logger) =>
  EffectLogger.make(({ logLevel, message, annotations }) => {
    const srvName = getSrvName(annotations);
    const label = getLogLabel(annotations);

    const msg = (Array.isArray(message) ? message : [message])
      .map((a) =>
        typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean'
          ? a
          : JSON.stringify(a),
      )
      .join(' ');

    switch (logLevel) {
      case LogLevel.Debug:
        winstonLogger.debug(msg, { label, srv: srvName });
        break;

      case LogLevel.Error:
      case LogLevel.Fatal:
        winstonLogger.error(msg, { label, srv: srvName });
        break;

      case LogLevel.Warning:
        winstonLogger.warn(msg, { label, srv: srvName });
        break;

      case LogLevel.Info:
        winstonLogger.info(msg, { label, srv: srvName });
        break;

      case LogLevel.None:
        break;

      case LogLevel.Trace:
      default:
        winstonLogger.info(msg, { label, srv: srvName });
    }
  });
