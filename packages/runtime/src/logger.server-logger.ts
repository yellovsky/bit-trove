// global modules
import winston from 'winston';
import { Logger as EffectLogger, LogLevel } from 'effect';

// local modules
import { stringToHash } from './logger.utils';
import { getLabel, getSrv } from './logger.constants';

import {
  SERVER_LOGGER_COLORS,
  type ServerBgColor,
  type ServerTextColor,
} from './logger.server-colors';

type ColorsMap = {
  [key in `srv-${number}`]: `${ServerTextColor} ${ServerBgColor}`;
};

const colorsMap: ColorsMap = SERVER_LOGGER_COLORS.reduce(
  (acc, { bgColor, textColor }, index) => ({ ...acc, [`srv-${index}`]: `${bgColor} ${textColor}` }),
  {} as ColorsMap,
);

const makeWinstonLogger = (...transports: winston.transports.ConsoleTransportInstance[]) => {
  winston.addColors(colorsMap);
  const colorizer = winston.format.colorize();

  const consoleFormat = winston.format.printf(({ level, message, label, timestamp, srv }) => {
    const srvName = String(srv);

    const combinedLabel = [srvName ? `@${srvName}` : undefined, label].filter(Boolean).join('.');

    const colorizedLevel = !combinedLabel
      ? combinedLabel
      : colorizer.colorize(
          `srv-${stringToHash(srvName, SERVER_LOGGER_COLORS.length)}`,
          ` ${combinedLabel} `,
        );

    return [timestamp, level, `${colorizedLevel}`].filter(Boolean).join(' ') + `: ${message}`;
  });

  return winston.createLogger({
    level: 'debug',
    transports,

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

export const createServerLogger = (
  ...transports: winston.transports.ConsoleTransportInstance[]
) => {
  const winstonLogger = makeWinstonLogger(...transports);

  return EffectLogger.make(({ logLevel, message, annotations }) => {
    const srv = getSrv(annotations);
    const label = getLabel(annotations);

    const msg = (Array.isArray(message) ? message : [message])
      .map(a =>
        typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean'
          ? a
          : JSON.stringify(a),
      )
      .join(' ');

    switch (logLevel) {
      case LogLevel.Debug:
        winstonLogger.debug(msg, { label, srv });

        break;

      case LogLevel.Error:
      case LogLevel.Fatal:
        winstonLogger.error(msg, { label, srv });
        break;

      case LogLevel.Warning:
        winstonLogger.warn(msg, { label, srv });
        break;

      case LogLevel.Info:
        winstonLogger.info(msg, { label, srv });
        break;

      case LogLevel.None:
        break;

      case LogLevel.Trace:
      default:
        winstonLogger.info(msg, { label, srv });
    }
  });
};
