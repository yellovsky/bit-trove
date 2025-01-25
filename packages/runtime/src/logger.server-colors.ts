// local modules
import type { LoggerColor } from './logger.types';

const textColors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
] as const;

const bgColors = [
  'blackBG',
  'redBG',
  'greenBG',
  'yellowBG',
  'blueBG',
  'magentaBG',
  'cyanBG',
  'whiteBG',
] as const;

export type ServerTextColor = (typeof textColors)[number];
export type ServerBgColor = (typeof bgColors)[number];

export const SERVER_LOGGER_COLORS: LoggerColor[] = textColors.reduce(
  (textAcc, textColor) => [...textAcc, ...bgColors.map(bgColor => ({ bgColor, textColor }))],
  [] as LoggerColor[],
);
