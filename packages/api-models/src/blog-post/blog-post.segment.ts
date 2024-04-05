// global modules
import * as R from 'ramda';
import type { QueryFunction } from '@tanstack/react-query';
import type { SupportedLocale } from '@bit-trove/localization/config';

import {
  getApiClient,
  type Populate,
  type APIResponseData,
  type PaginationParams,
  type APIResponseCollection,
} from '@bit-trove/api-models/common';

// local modules
import type { BlogpostCore } from './blog-post.core';
import { BLOG_POST_POPULATE, type BlogpostPopulate } from './blog-post.standalone';

const DEFAULTBLOG_POST_LIST_SORT = 'createdAt:desc';

const omitted = ['seo', 'blocks', 'categories'] as const;
type BlogpostSegmentPopulate = Omit<BlogpostPopulate, (typeof omitted)[number]>;
export interface BlogpostSegment extends BlogpostCore, BlogpostSegmentPopulate {}

export type BlogpostSegmentResponseData = APIResponseData<BlogpostSegment>;

const BLOG_POST_SEGMENT_POPULATE = {
  populate: R.omit(omitted, BLOG_POST_POPULATE.populate) satisfies Populate<
    keyof BlogpostSegmentPopulate
  >,
};

export type BlogpostSegmentResponseCollection = APIResponseCollection<BlogpostSegment>;

export interface BlogpostSegmentListFP {
  locale: SupportedLocale;
  sort?: 'createdAt:desc' | 'createdAt:asc';
}

export const fetchBlogpostSegmentCollection: QueryFunction<
  BlogpostSegmentResponseCollection,
  ['blogpost_segment_list', BlogpostSegmentListFP],
  PaginationParams
> = ({ queryKey, signal, pageParam }) =>
  getApiClient()
    .get('/blogposts', {
      signal,
      params: {
        ...BLOG_POST_SEGMENT_POPULATE,
        sort: DEFAULTBLOG_POST_LIST_SORT,
        pagination: pageParam,
        ...queryKey[1],
      },
    })
    .then((response) => response.data);
