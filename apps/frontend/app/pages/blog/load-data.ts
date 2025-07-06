import { dehydrate } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { DEFAULT_BLOG_POST_SORT } from '@features/blog-posts/lib/sorting';

import { type GetManyBlogPostsVariables, prefetchManyBlogPostsQuery } from '@entities/blog-posts';

import type { Route } from './+types';

export const loadBlogPostsRouteData = async (
  t: TFunction,
  tBlogPosts: TFunction<'blog_posts'>,
  { params }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const blogPostsVars: GetManyBlogPostsVariables = {
    locale: params.locale,
    sort: DEFAULT_BLOG_POST_SORT,
  };

  await prefetchManyBlogPostsQuery(apiClient, queryClient, blogPostsVars);

  return {
    blogPostsVars,
    dehydratedState: dehydrate(queryClient),
    metaDescription: tBlogPosts('blog_posts_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tBlogPosts('blog_posts_meta_keywords')),
    metaTitle: getMetaTitle(tBlogPosts('blog_posts_meta_title'), t('meta_title_suffix')),
  };
};
