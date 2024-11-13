// global modules
import * as R from 'ramda';
import type { Prisma } from '@prisma/client';
import { validate as validateUUID } from 'uuid';

// common modules
import type { PublishingFilter } from 'src/types/publishing-filter';

type PublishedAt<TModel extends string> =
  | Prisma.DateTimeNullableFilter<TModel>
  | Date
  | string
  | null;

const setPublishedAt = <TWhere>(
  lens: R.Lens<any, any>,
  pFilter: PublishingFilter,
  where: TWhere,
): TWhere => {
  if (pFilter === 'any') return where;
  return R.set(lens, pFilter == 'published' ? { not: null } : null, where);
};

export const addSlugOrIDFilter =
  (slugOrID: string) =>
  <TWhere extends object>(
    where: TWhere,
  ): TWhere & ({ slug: string } | { id: string }) =>
    validateUUID(slugOrID)
      ? { ...where, id: slugOrID }
      : { ...where, slug: slugOrID };

export const addPublishingFilter =
  (pFilter: PublishingFilter) =>
  <
    TModel extends string,
    TWhere extends { published_at?: PublishedAt<TModel> },
  >(
    where: TWhere,
  ): TWhere =>
    setPublishedAt(R.lensProp('published_at'), pFilter, where);

export const addTranslationsPublishingFilter =
  (pFilter: PublishingFilter) =>
  <
    TModel extends string,
    TWhere extends {
      translations?: { some?: { published_at?: PublishedAt<TModel> } };
    },
  >(
    where: TWhere,
  ): TWhere =>
    setPublishedAt(
      R.lensPath(['translations', 'some', 'published_at']),
      pFilter,
      where,
    );

export const addArticlePublishingFilter =
  (pFilter: PublishingFilter) =>
  <
    TModel extends string,
    TWhere extends {
      article?: { published_at?: PublishedAt<TModel> };
    },
  >(
    where: TWhere,
  ): TWhere =>
    setPublishedAt(
      R.lensPath(['article', 'translations', 'some', 'published_at']),
      pFilter,
      setPublishedAt(R.lensPath(['article', 'published_at']), pFilter, where),
    );
