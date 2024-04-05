// local modules
import type { BlogpostCore } from './blog-post.core';

export const blogPostLink = (blogpost: BlogpostCore): string => `/blog/${blogpost.slug}`;
