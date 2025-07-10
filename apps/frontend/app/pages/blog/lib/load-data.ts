import { dehydrate } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { DEFAULT_BLOG_POST_SORT } from '@features/blog-posts/lib/sorting';

import { type GetManyBlogPostsVariables, prefetchManyBlogPostsQuery } from '@entities/blog-posts';

import type { Route } from '../+types';

// Valid sort values for blog posts
const VALID_SORT_VALUES = ['createdAt', '-createdAt', 'publishedAt', '-publishedAt', 'title', '-title'] as const;
type ValidSortValue = (typeof VALID_SORT_VALUES)[number];

const isValidSortValue = (value: string): value is ValidSortValue => {
  return VALID_SORT_VALUES.includes(value as ValidSortValue);
};

export const loadBlogPostsRouteData = async (
  t: TFunction,
  tBlogPosts: TFunction<'blog_posts'>,
  { params, request }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  // Extract sort parameter from URL and validate it
  const url = new URL(request.url);
  const sortParam = url.searchParams.get('sort') || DEFAULT_BLOG_POST_SORT;
  const validatedSort = isValidSortValue(sortParam) ? sortParam : DEFAULT_BLOG_POST_SORT;

  const blogPostsVars: GetManyBlogPostsVariables = {
    locale: params.locale,
    sort: validatedSort,
  };

  // Breadcrumbs: Home → Blog
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.blog.title'), to: '/blog' },
  ];

  await prefetchManyBlogPostsQuery(apiClient, queryClient, blogPostsVars);

  return {
    blogPostsVars,
    breadcrumbs,
    dehydratedState: dehydrate(queryClient),
    metaDescription: tBlogPosts('blog_posts_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tBlogPosts('blog_posts_meta_keywords')),
    metaTitle: getMetaTitle(tBlogPosts('blog_posts_meta_title'), t('meta_title_suffix')),
  };
};
