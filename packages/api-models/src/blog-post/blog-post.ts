import * as zod from 'zod';

import { articleSchema, type ShortArticle, shortArticleSchema } from '../article';

export const shortBlogPostSchema = shortArticleSchema.omit({ type: true }).extend({ type: zod.literal('blog_post') });
export type ShortBlogPost = zod.infer<typeof shortBlogPostSchema>;
export const isShortBlogPost = (maybeBlogPost: ShortArticle): maybeBlogPost is ShortBlogPost =>
  maybeBlogPost.type === 'blog_post';

export const blogPostSchema = articleSchema.omit({ type: true }).extend({ type: zod.literal('blog_post') });
export type BlogPost = zod.infer<typeof blogPostSchema>;
export const isBlogPost = (maybeBlogPost: ShortArticle): maybeBlogPost is BlogPost =>
  maybeBlogPost.type === 'blog_post';
