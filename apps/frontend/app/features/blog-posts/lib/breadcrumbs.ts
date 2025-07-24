import type { TFunction } from 'i18next';

import type { BlogPost } from '@repo/api-models';

import { getBlogPostLink, getBlogPostsLink } from '@features/blog-posts';
import type { AppBreadcrumb } from '@features/breadcrumbs';

// Breadcrumbs: Home → Blog
export const getBlogBreadcrumbs = (t: TFunction): AppBreadcrumb[] => [
  { label: t('menu_items.home.title'), to: '/' },
  { label: t('menu_items.blog.title'), to: getBlogPostsLink() },
];

// Breadcrumbs: Home → Blog → Blog Post
export const getBlogPostBreadcrumbs = (t: TFunction, blogPost: BlogPost): AppBreadcrumb[] => [
  ...getBlogBreadcrumbs(t),
  { label: blogPost.title, to: getBlogPostLink(blogPost) },
];
