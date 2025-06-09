import type { ShortBlogPost } from '@repo/api-models';

export const getBlogPostLink = (blogPost: ShortBlogPost): string => `/blog/${blogPost.slug}`;
