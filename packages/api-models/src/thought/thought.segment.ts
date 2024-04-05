// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import type { QueryFunction } from '@tanstack/react-query';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { generateFakeAuthorSegmentResponse } from '@bit-trove/api-models/author';
import { generateFakeTagSegmentResponseCollection } from '@bit-trove/api-models/tag';
import { generateFakeCatgorySegmentResponseCollection } from '@bit-trove/api-models/category';

import {
  getApiClient,
  type Populate,
  type APIResponseData,
  type PaginationParams,
  type APIResponseCollection,
} from '@bit-trove/api-models/common';

// local modules
import type { ThoughtCore } from './thought.core';
import { THOUGHT_POPULATE, type ThoughtPopulate } from './thought.standalone';

const DEFAULT_THOUGHT_COLLECTION_SORT = 'createdAt:desc';

const omitted = ['seo', 'blocks'] as const;
type ThoughtSegmentPopulate = Omit<ThoughtPopulate, (typeof omitted)[number]>;

export interface ThoughtSegment extends ThoughtCore, ThoughtSegmentPopulate {}
export type ThoughtSegmentResponseData = APIResponseData<ThoughtSegment>;

const THOUGHT_SEGMENT_POPULATE = {
  populate: R.omit(omitted, THOUGHT_POPULATE.populate) satisfies Populate<
    keyof ThoughtSegmentPopulate
  >,
};

export type ThoughtSegmentResponseCollection = APIResponseCollection<ThoughtSegment>;

export interface ThoughtSegmentCollectionFP {
  locale: SupportedLocale;
  sort?: 'createdAt:desc' | 'createdAt:asc';
}

export const fetchThoughtSegmentCollection: QueryFunction<
  ThoughtSegmentResponseCollection,
  ['thought_segment_collection', ThoughtSegmentCollectionFP],
  PaginationParams
> = ({ queryKey, signal, pageParam }) =>
  getApiClient()
    .get('/thoughts', {
      signal,
      params: {
        ...THOUGHT_SEGMENT_POPULATE,
        pagination: pageParam,
        sort: DEFAULT_THOUGHT_COLLECTION_SORT,
        ...queryKey[1],
      },
    })
    .then((response) => response.data)
    .then(
      (response) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(response);
          }, 2000)
        )
    );

export const generateFakeThoughtSegmentResponseCollection =
  (): ThoughtSegmentResponseCollection => {
    const total = faker.number.int({ min: 20, max: 40 });
    const author = generateFakeAuthorSegmentResponse();
    const getPrecision = (delta: number) => Math.round(delta / 8);

    return {
      data: R.times((id) => {
        const between = {
          from: new Date(2000, 10 + getPrecision(id)),
          to: new Date(2000, 12 + getPrecision(id)),
        };

        return {
          id,
          attributes: {
            author,
            locale: 'en',
            slug: faker.lorem.word(),
            title: faker.lorem.sentence(),
            tags: generateFakeTagSegmentResponseCollection(),
            createdAt: faker.date.between(between).toUTCString(),
            updatedAt: faker.date.between(between).toUTCString(),
            publishedAt: faker.date.between(between).toUTCString(),
            categories: generateFakeCatgorySegmentResponseCollection(),
          },
        };
      }, total).sort(
        (a, b) =>
          new Date(a.attributes.publishedAt).getTime() -
          new Date(b.attributes.publishedAt).getTime()
      ),
      meta: {
        pagination: { limit: total, start: 0, total },
      },
    };
  };
