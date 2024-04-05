export { blogPostLink } from './blog-post.helpers';
export type { BlogpostCore } from './blog-post.core';
export { fetchBlogpostSegmentCollection } from './blog-post.segment';
export { BLOG_POST_POPULATE, fetchBlogpost } from './blog-post.standalone';
export { getBlogpostViews, incrementBlogpostViews } from './blog-post.views-count';

export type {
  BlogpostSegment,
  BlogpostSegmentListFP,
  BlogpostSegmentResponseCollection,
  BlogpostSegmentResponseData,
} from './blog-post.segment';

export type {
  Blogpost,
  BlogpostFP,
  BlogpostPopulate,
  BlogpostResponse,
  BlogpostResponseCollection,
  BlogpostResponseData,
} from './blog-post.standalone';

export type {
  ViewsCount,
  ViewsCountResponse,
  ViewsCountResponseCollection,
} from './blog-post.views-count';
