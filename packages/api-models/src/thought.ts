// global modules
import * as R from 'ramda';
import { faker } from '@faker-js/faker';
import type { QueryFunction } from '@tanstack/react-query';
import { POPULATE_BLOCKS, type Block } from '@repo/api-models/block';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@repo/api-models/seo';

import {
  CATEGORY_SEGMENT_POPULATE,
  type CatgorySegmentResponseCollection,
  generateFakeCatgorySegmentResponseCollection,
} from '@repo/api-models/category';

import {
  AUTHOR_SEGMENT_POPULATE,
  generateFakeAuthorSegment,
  type AuthorSegmentResponse,
} from '@repo/api-models/author';

import {
  getApiClient,
  type Populate,
  initialPageParam,
  type APIResponse,
  type APIResponseData,
  type PaginationParams,
  type APIResponseCollection,
} from '@repo/api-models/common';

import {
  TAG_SEGMENT_POPULATE,
  type TagSegmentResponseCollection,
  generateFakeTagSegmentResponseCollection,
} from '@repo/api-models/tag';

// ==================================================
//               C O N S T A N T S
// ==================================================
const DEFAULT_THOUGHT_COLLECTION_SORT = 'createdAt:desc';

// ==================================================
//                    C O R E
// ==================================================
interface ThoughtCore {
  slug: string;
  title: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ==================================================
//              S T A N D A L O N E
// ==================================================
interface ThoughtPopulate {
  seo: SeoSegment;
  blocks: Block[];
  author: AuthorSegmentResponse;
  tags: TagSegmentResponseCollection;
  categories: CatgorySegmentResponseCollection;
}

export interface Thought extends ThoughtCore, ThoughtPopulate {}

export const THOUGHT_POPULATE = {
  populate: {
    blocks: POPULATE_BLOCKS,
    seo: SEO_SEGMENT_POPULATE,
    tags: TAG_SEGMENT_POPULATE,
    author: AUTHOR_SEGMENT_POPULATE,
    categories: CATEGORY_SEGMENT_POPULATE,
  } satisfies Populate<keyof ThoughtPopulate>,
};

export type ThoughtResponseData = APIResponseData<Thought>;
export type ThoughtResponse = APIResponse<Thought>;
export type ThoughtResponseCollection = APIResponseCollection<Thought>;

export interface ThoughtFP {
  locale: SupportedLocale;
  slug: string;
}

export const fetchThought = (
  { locale, slug }: ThoughtFP,
  signal?: AbortSignal
): Promise<ThoughtResponse> =>
  getApiClient()
    .get<ThoughtResponseCollection>('/thoughts', {
      signal,
      params: {
        ...THOUGHT_POPULATE,
        locale,
        pagination: initialPageParam,
        filters: { slug: { $eq: slug } },
        sort: DEFAULT_THOUGHT_COLLECTION_SORT,
      },
    })
    .then((response) => response.data)
    .then((response) => ({ data: response.data.length ? response.data[0] || null : null }));

export const thoughtQueryFn: QueryFunction<ThoughtResponse, ['thought', ThoughtFP]> = ({
  queryKey,
}) => fetchThought(queryKey[1]);

// ==================================================
//               S E G M E N T
// ==================================================
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
    .then((response) => response.data);

export const generateFakeThoughtSegmentResponseCollection =
  (): ThoughtSegmentResponseCollection => {
    const total = faker.number.int({ min: 20, max: 40 });
    const author = generateFakeAuthorSegment();
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

// ==========================================================
//                  L I N K
// ==========================================================
export const thoughtLink = (thought: ThoughtCore): string => `/thoughts/${thought.slug}`;
