export {
  fetchBlogPostEP,
  type FetchBlogPostVariables,
  useBlogPostQuery,
  getBlogPostQueryResult,
  prefetchBlogPostQuery,
} from './blog-post.fetch';

export {
  useBlogPostListInfiniteQuery,
  type FetchBlogPostListInfiniteVariables,
  getBlogPostListInfiniteQueryResult,
  prefetchBlogPostListInfiniteQuery,
  getBlogPostList,
} from './blog-post.fetch-list-infinite';

export {
  fetchCMSBlogPostListEP,
  type FetchCMSBlogPostListVariables,
  useCMSBlogPostListInfiniteQuery,
  prefetchCMSBlogPostListQuery,
} from './blog-post.cms.fetch-list';
