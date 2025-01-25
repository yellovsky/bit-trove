// global modules
import { Logger, LogLevel } from 'effect';

// local modules
import { CLIENT_LOGGER_COLORS } from './logger.client-colors';
import { stringToHash } from './logger.utils';
import { getLabel, getSrv } from './logger.constants';

const getLoggerColors = (label: string = '') =>
  CLIENT_LOGGER_COLORS[stringToHash(label, CLIENT_LOGGER_COLORS.length)] || CLIENT_LOGGER_COLORS[0];

const getLoggerTime = (date: Date, locale = 'en-US') => {
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  });

  // Get the milliseconds
  const milliseconds = date.getMilliseconds();

  // Combine the localized time and milliseconds
  return `${timeFormatter.format(date)}.${milliseconds}`;
};

const getLoggerArgs = (params: {
  label?: string;
  date: Date;
  message: unknown;
  srv?: string;
}): unknown[] => {
  const { bgColor, textColor } = getLoggerColors(params.srv);
  const prefix = [
    `%c>${getLoggerTime(params.date)}`,
    params.srv ? `@${params.srv}` : '',
    params.label ? `[${params.label}]` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return [
    prefix,
    `color: ${textColor}; font-style: italic; background-color: ${bgColor};padding: 2px`,
    ...(Array.isArray(params.message) ? params.message : [params.message]),
  ];
};

export const createClientLogger = () =>
  Logger.make(({ logLevel, message, annotations, date }) => {
    const srv = getSrv(annotations);
    const label = getLabel(annotations);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logArgs: any[] = getLoggerArgs({ date, label, message, srv });

    switch (logLevel) {
      case LogLevel.Debug:
        // eslint-disable-next-line no-console
        console.debug(...logArgs);
        break;

      case LogLevel.Error:
      case LogLevel.Fatal:
        console.error(...logArgs);
        break;

      case LogLevel.Warning:
        console.warn(...logArgs);
        break;

      case LogLevel.Info:
        // eslint-disable-next-line no-console
        console.info(...logArgs);
        break;

      case LogLevel.None:
        break;

      case LogLevel.Trace:
        // eslint-disable-next-line no-console
        console.trace(...logArgs);
        break;

      default:
        // eslint-disable-next-line no-console
        console.log(...logArgs);
    }
  });
