// global modules
import * as R from 'ramda';
import { create } from '@yornaath/batshit';
import type { QueryFunction } from '@tanstack/react-query';
import { POPULATE_BLOCKS, type Block } from '@repo/api-models/block';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { TAG_POPULATE, type TagListResponse } from '@repo/api-models/tag';
import { SEO_SEGMENT_POPULATE, type SeoSegment } from '@repo/api-models/seo';
import { UPLOAD_FILE_POPULATE, type UploadFileResponse } from '@repo/api-models/upload-file';
import { AUTHOR_SEGMENT_POPULATE, type AuthorSegmentResponse } from '@repo/api-models/author';

import {
  getApiClient,
  type Populate,
  initialPageParam,
  type PaginationParams,
  type WithPaginationMeta,
  type APIResponseCollection,
  type APIResponse,
  type APIResponseData,
} from '@repo/api-models/common';

import {
  CATEGORY_SEGMENT_POPULATE,
  type CategorySegmentListResponse,
} from '@repo/api-models/category';

// ==================================================
//               C O N S T A N T S
// ==================================================
const DEFAULTBLOG_POST_LIST_SORT = 'createdAt:desc';

// ==================================================
//                    C O R E
// ==================================================
interface BlogpostCore {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views_count: string | null;
  short_description: string | null;
}

// ==================================================
//              S T A N D A L O N E
// ==================================================
interface BlogpostPopulate {
  seo: SeoSegment;
  blocks: Block[];
  tags: TagListResponse;
  author: AuthorSegmentResponse;
  cover: UploadFileResponse;
  categories: CategorySegmentListResponse;
}

export interface Blogpost extends BlogpostCore, BlogpostPopulate {}

export const BLOG_POST_POPULATE = {
  populate: {
    tags: TAG_POPULATE,
    blocks: POPULATE_BLOCKS,
    seo: SEO_SEGMENT_POPULATE,
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

export const fetchBlogpost: QueryFunction<BlogpostResponse, ['blogpost', BlogpostFP]> = ({
  queryKey: [_, { locale, slug }],
  signal,
}) =>
  getApiClient()
    .get<BlogpostResponseCollection>('/blogposts', {
      signal,
      params: {
        ...BLOG_POST_POPULATE,
        sort: DEFAULTBLOG_POST_LIST_SORT,
        pagination: initialPageParam,
        locale,
        filters: { slug: { $eq: slug } },
      },
    })
    .then((response) => response.data)
    .then((response) => ({ data: response.data.length ? response.data[0] || null : null }));

// ==================================================
//               S E G M E N T
// ==================================================
const omitted = ['seo', 'blocks', 'categories'] as const;
type BlogpostSegmentPopulate = Omit<BlogpostPopulate, (typeof omitted)[number]>;
export interface BlogpostSegment extends BlogpostCore, BlogpostSegmentPopulate {}

export interface BlogpostSegmentEntity {
  id: number;
  attributes: BlogpostSegment;
}

const BLOG_POST_SEGMENT_POPULATE = {
  populate: R.omit(omitted, BLOG_POST_POPULATE.populate) satisfies Populate<
    keyof BlogpostSegmentPopulate
  >,
};

export interface BlogpostSegmentListResponse {
  data: BlogpostSegmentEntity[];
}

export interface BlogpostSegmentListFP {
  locale: SupportedLocale;
  sort?: 'createdAt:desc' | 'createdAt:asc';
}

export const fetchBlogpostSegmentList: QueryFunction<
  BlogpostSegmentListResponse & WithPaginationMeta,
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

// ==========================================================
//          G E T   V I E W S   C O U N T
// ==========================================================
export interface ViewsCount {
  views_count: number;
}
type ViewsCountResponse = APIResponse<ViewsCount>;
type ViewsCountResponseCollection = APIResponseCollection<ViewsCount>;

const blogpostsViews = create({
  fetcher: (id_in: number[]) =>
    getApiClient()
      .get<ViewsCountResponseCollection>('/blogpost-views', {
        params: { filters: { id: { $in: id_in } } },
      })
      .then((response) => response.data),

  resolver: (collectionResponse, id): ViewsCountResponse => {
    const founded = collectionResponse.data.find((response) => response.id === id);
    return founded ? { data: founded } : { data: { id, attributes: { views_count: 0 } } };
  },
});

export const getBlogpostViews: QueryFunction<
  ViewsCountResponse,
  ['blogpost_views_count', number]
> = ({ queryKey: [_, id] }) => blogpostsViews.fetch(id);

// ==========================================================
//     I N C R E M E N T   V I E W S   C O U N T
// ==========================================================
export const incrementBlogpostViews = (blogpostID: number) =>
  getApiClient()
    .post<ViewsCountResponse>('/blogpost-views', { id: blogpostID })
    .then((response) => response.data);

// ==========================================================
//                  L I N K
// ==========================================================
export const blogPostLink = (blogpost: BlogpostCore): string => `/blog/${blogpost.slug}`;
