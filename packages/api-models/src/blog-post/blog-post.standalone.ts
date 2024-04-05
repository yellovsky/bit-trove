// global modules
import type { SupportedLocale } from '@bit-trove/localization/config';
import { POPULATE_BLOCKS, type Block } from '@bit-trove/api-models/block';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@bit-trove/api-models/seo';
import { TAG_SEGMENT_POPULATE, type TagResponseCollection } from '@bit-trove/api-models/tag';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@bit-trove/api-models/upload-file';
import { AUTHOR_SEGMENT_POPULATE, type AuthorSegmentResponse } from '@bit-trove/api-models/author';

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

// local modules
import type { BlogpostCore } from './blog-post.core';

export interface BlogpostPopulate {
  seo: SeoSegment;
  blocks: Block[];
  cover: UploadFileResponse;
  tags: TagResponseCollection;
  author: AuthorSegmentResponse;
  categories: CatgorySegmentResponseCollection;
}

export interface Blogpost extends BlogpostCore, BlogpostPopulate {}

export const BLOG_POST_POPULATE = {
  populate: {
    blocks: POPULATE_BLOCKS,
    seo: SEO_SEGMENT_POPULATE,
    tags: TAG_SEGMENT_POPULATE,
    cover: UPLOAD_FILE_POPULATE,
    author: AUTHOR_SEGMENT_POPULATE,
    categories: CATEGORY_SEGMENT_POPULATE,
  } satisfies Populate<keyof BlogpostPopulate>,
};

export type BlogpostResponseData = APIResponseData<Blogpost>;
export type BlogpostResponse = APIResponse<Blogpost>;
export type BlogpostResponseCollection = APIResponseCollection<Blogpost>;

export interface BlogpostFP {
  locale: SupportedLocale;
  slug: string;
}

export const fetchBlogpost = (
  { locale, slug }: BlogpostFP,
  signal?: AbortSignal
): Promise<BlogpostResponse> =>
  getApiClient()
    .get<BlogpostResponseCollection>('/blogposts', {
      signal,
      params: {
        ...BLOG_POST_POPULATE,
        pagination: initialPageParam,
        locale,
        filters: { slug: { $eq: slug } },
      },
    })
    .then((response) => response.data)
    .then((response) => ({ data: response.data.length ? response.data[0] || null : null }));
