// global modules
import type { QueryFunction } from '@tanstack/react-query';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { AUTHOR_SEGMENT_POPULATE, type AuthorSegmentResponse } from '@bit-trove/api-models/author';
import { type Block, POPULATE_BLOCKS } from '@bit-trove/api-models/block';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@bit-trove/api-models/seo';
import { TAG_SEGMENT_POPULATE, type TagSegmentResponseCollection } from '@bit-trove/api-models/tag';

import {
  CATEGORY_SEGMENT_POPULATE,
  type CatgorySegmentResponseCollection,
} from '@bit-trove/api-models/category';

import {
  type APIResponse,
  type APIResponseCollection,
  type APIResponseData,
  getApiClient,
  initialPageParam,
  type Populate,
} from '@bit-trove/api-models/common';

import type { ThoughtCore } from './thought.core';

export interface ThoughtPopulate {
  blocks: Block[];
  seo: SeoSegment | null;
  author: AuthorSegmentResponse;
  tags: TagSegmentResponseCollection;
  categories: CatgorySegmentResponseCollection;
}

export interface Thought extends ThoughtCore, ThoughtPopulate {}

export const THOUGHT_POPULATE = {
  populate: {
    author: AUTHOR_SEGMENT_POPULATE,
    blocks: POPULATE_BLOCKS,
    categories: CATEGORY_SEGMENT_POPULATE,
    seo: SEO_SEGMENT_POPULATE,
    tags: TAG_SEGMENT_POPULATE,
  } satisfies Populate<keyof ThoughtPopulate>,
};

export type ThoughtResponseData = APIResponseData<Thought>;
export type ThoughtResponse = APIResponse<Thought>;
export type ThoughtResponseCollection = APIResponseCollection<Thought>;

export interface ThoughtFP {
  slug: string;
  locale: SupportedLocale;
}

export const fetchThought = (fp: ThoughtFP, signal?: AbortSignal): Promise<ThoughtResponse> =>
  getApiClient()
    .get<ThoughtResponseCollection>('/thoughts', {
      signal,

      params: {
        ...THOUGHT_POPULATE,
        filters: { slug: { $eq: fp.slug } },
        locale: fp.locale,
        pagination: initialPageParam,
      },
    })
    .then((response) => response.data)
    .then((response) => ({ data: response.data.length ? response.data[0] || null : null }));

export const thoughtQueryFn: QueryFunction<ThoughtResponse, ['thought', ThoughtFP]> = ({
  queryKey,
}) => fetchThought(queryKey[1]);
