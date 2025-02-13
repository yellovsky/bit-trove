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

const reduceBgColor = <TTextColor extends (typeof textColors)[number]>(
  textColor: TTextColor,
): Array<`${TTextColor} ${(typeof textColors)[number]}`> =>
  bgColors.reduce(
    (bgAcc, bgColor) => [
      ...bgAcc,
      `${textColor} ${bgColor}` as `${TTextColor} ${(typeof textColors)[number]}`,
    ],
    [] as Array<`${TTextColor} ${(typeof textColors)[number]}`>,
  );

export const availableConsoleColors: Array<`${(typeof textColors)[number]} ${(typeof textColors)[number]}`> =
  textColors.reduce(
    (textAcc, textColor) => [...textAcc, ...reduceBgColor(textColor)],
    [] as Array<`${(typeof textColors)[number]} ${(typeof textColors)[number]}`>,
  );

export const colorsMap = availableConsoleColors.reduce(
  (acc, colorString, index) => ({ ...acc, [`srv-${index}`]: colorString }),
  {} as {
    [key in `srv-${number}`]: `${(typeof textColors)[number]} ${(typeof textColors)[number]}`;
  },
);
