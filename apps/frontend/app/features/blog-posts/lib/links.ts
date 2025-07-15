import type { ShortBlogPost } from '@repo/api-models';

export const getBlogPostLink = (blogPost: Pick<ShortBlogPost, 'slug' | 'type'>): string => `/blog/${blogPost.slug}`;

export const getBlogPostsLink = (): string => '/blog';

export const getCreateBlogPostLink = (): string => '/cms/blog-posts/create';

export const getEditBlogPostLink = (blogPost: ShortBlogPost): string => `/cms/blog-posts/${blogPost.id}/edit`;

export const getCmsBlogPostsLink = (): string => '/cms/blog-posts';
