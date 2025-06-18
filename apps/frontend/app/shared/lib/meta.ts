import * as R from 'ramda';

const TITLE_DELIMITER = '|';

export const getMetaTitle = (title: string, suffix: string) =>
  [title, suffix].filter(Boolean).join(` ${TITLE_DELIMITER} `);

export const combineMetaKeywords = (generalKeywords: string, keywords: string) =>
  R.uniq([...generalKeywords.split(','), ...keywords.split(',')].map((k) => k.trim())).join(',');
