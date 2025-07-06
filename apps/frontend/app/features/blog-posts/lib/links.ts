import type { ShortBlogPost } from '@repo/api-models';

export const getBlogPostLink = (blogPost: ShortBlogPost): string => `/blog/${blogPost.slug}`;

export const getBlogPostsLink = (): string => '/blog';

export const getCreateBlogPostLink = (): string => '/cms/blog-posts/create';

export const getEditBlogPostLink = (blogPost: ShortBlogPost): string => `/cms/blog-posts/edit/${blogPost.id}`;

export const getCmsBlogPostsLink = (): string => '/cms/blog-posts';
