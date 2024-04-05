// global modules
import type { QueryFunction } from '@tanstack/react-query';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { POPULATE_BLOCKS, type Block } from '@bit-trove/api-models/block';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@bit-trove/api-models/seo';
import { AUTHOR_SEGMENT_POPULATE, type AuthorSegmentResponse } from '@bit-trove/api-models/author';
import { TAG_SEGMENT_POPULATE, type TagSegmentResponseCollection } from '@bit-trove/api-models/tag';

import {
  CATEGORY_SEGMENT_POPULATE,
  type CatgorySegmentResponseCollection,
} from '@bit-trove/api-models/category';

import {
  getApiClient,
  type Populate,
  initialPageParam,
  type APIResponse,
  type APIResponseData,
  type APIResponseCollection,
} from '@bit-trove/api-models/common';

import type { ThoughtCore } from './thought.core';

export interface ThoughtPopulate {
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
  slug: string;
  locale: SupportedLocale;
}

export const fetchThought = (fp: ThoughtFP, signal?: AbortSignal): Promise<ThoughtResponse> =>
  getApiClient()
    .get<ThoughtResponseCollection>('/thoughts', {
      signal,
      params: {
        ...THOUGHT_POPULATE,
        locale: fp.locale,
        pagination: initialPageParam,
        filters: { slug: { $eq: fp.slug } },
      },
    })
    .then((response) => response.data)
    .then((response) => ({ data: response.data.length ? response.data[0] || null : null }));

export const thoughtQueryFn: QueryFunction<ThoughtResponse, ['thought', ThoughtFP]> = ({
  queryKey,
}) => fetchThought(queryKey[1]);
