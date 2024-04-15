// global modules
import * as R from 'ramda';
import type { QueryFunction } from '@tanstack/react-query';

import {
  type APIResponseCollection,
  type APIResponseData,
  getApiClient,
  type PaginationParams,
  type Populate,
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
  locale: string;
  sort?: 'createdAt:desc' | 'createdAt:asc';
}

export const fetchBlogpostSegmentCollection: QueryFunction<
  BlogpostSegmentResponseCollection,
  ['blogpost_segment_list', BlogpostSegmentListFP],
  PaginationParams
> = ({ queryKey, signal, pageParam }) =>
  getApiClient()
    .get('/blogposts', {
      params: {
        ...BLOG_POST_SEGMENT_POPULATE,
        pagination: pageParam,
        sort: DEFAULTBLOG_POST_LIST_SORT,
        ...queryKey[1],
      },
      signal,
    })
    .then((response) => response.data);
