import * as R from 'ramda';
import type { MetaDescriptor } from 'react-router';

import { SUPPORTED_LOCALES } from '@shared/config';

import { addLocaleToPathname, removeLocaleFromPathname } from './link';

const TITLE_DELIMITER = '|';

export const getMetaTitle = (title: string, suffix: string) =>
  [title, suffix].filter(Boolean).join(` ${TITLE_DELIMITER} `);

export const combineMetaKeywords = (generalKeywords: string, keywords: string) =>
  R.uniq([...generalKeywords.split(','), ...keywords.split(',')].map((k) => k.trim())).join(',');

export const filterParentMeta = (descriptors: MetaDescriptor[]) =>
  descriptors
    .filter((meta) => !('title' in meta))
    .filter((meta) => !('name' in meta && meta.name === 'keywords'))
    .filter((meta) => !('name' in meta && meta.name === 'description'));

export const getAlternateMetaDescriptors = (locale: string, pathname: string): MetaDescriptor[] =>
  SUPPORTED_LOCALES.filter((l) => l !== locale).map((hreflang) => ({
    href: addLocaleToPathname(removeLocaleFromPathname(pathname), hreflang),
    hreflang,
    rel: 'alternate',
  }));
