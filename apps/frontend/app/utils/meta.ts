// global modules
import * as R from 'ramda';
import type { MetaDescriptor, MetaFunction } from '@remix-run/node';

const isTitleMeta = (meta: MetaDescriptor): meta is { title: string } => 'title' in meta;
const hasTitleMeta = (metas: MetaDescriptor[]): boolean => metas.some(isTitleMeta);
const skipAddingIfTitle = (prev: MetaDescriptor[], meta: MetaDescriptor): boolean =>
  isTitleMeta(meta) && hasTitleMeta(prev);

const skipAddingByName = (prev: MetaDescriptor[], meta: MetaDescriptor): boolean =>
  'name' in meta && prev.findIndex(m => 'name' in m && m.name === meta.name) >= 0;

const isCanonicalMeta = (
  meta: MetaDescriptor,
): meta is {
  tagName: 'link';
  rel: 'canonical';
} => 'tagName' in meta && meta.tagName === 'link' && 'rel' in meta && meta.rel === 'canonical';
const hasCanonicalMeta = (metas: MetaDescriptor[]): boolean => metas.some(isCanonicalMeta);
const skipAddingIfCanonical = (prev: MetaDescriptor[], meta: MetaDescriptor): boolean =>
  isCanonicalMeta(meta) && hasCanonicalMeta(prev);

const innerMerge = (prev: MetaDescriptor[], current: MetaDescriptor[]): MetaDescriptor[] =>
  current.reduce(
    (acc, meta) =>
      [skipAddingIfTitle, skipAddingByName, skipAddingIfCanonical].some(predicate =>
        predicate(acc, meta),
      )
        ? acc
        : [...acc, meta],
    prev,
  );

export const mergeMeta =
  <TLoader>(fn: MetaFunction<TLoader>): MetaFunction<TLoader> =>
  arg =>
    R.uniqWith(
      R.equals,
      R.reverse([...arg.matches.map(match => match.meta), fn(arg)]).reduce(
        innerMerge,
        [] as MetaDescriptor[],
      ),
    );
