export const makePageMetaTitle = (...title: Array<string | undefined>): string =>
  [...title].filter(Boolean).join(' | ');
