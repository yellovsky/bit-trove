import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';

import { type ShortArticlesGetSort, shortArticlesGetSortSchema } from '@repo/api-models';

import { type ApiClient, getApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { combineMetaKeywords, getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import { getBlogPostsLink } from '@features/blog-posts';
import { DEFAULT_BLOG_POST_SORT } from '@features/blog-posts/lib/sorting';
import { getRequestCookieHeader } from '@features/language-switcher';

import { prefetchInfiniteShortBlogPosts, type ShortBlogPostsGetVariables } from '@entities/blog-posts';

import type { Route } from '../+types';

type LoadPlogPostsOptions = {
  apiClient: ApiClient;
  queryClient: QueryClient;
  request: Request;
  params: Route.LoaderArgs['params'];
};

const loadPlogPosts = async ({ apiClient, queryClient, request, params }: LoadPlogPostsOptions) => {
  // Extract sort parameter from URL and validate it
  const url = new URL(request.url);
  const sortParam = shortArticlesGetSortSchema.safeParse(url.searchParams.get('sort'));
  const validatedSort: ShortArticlesGetSort = sortParam.data || DEFAULT_BLOG_POST_SORT;

  const blogPostsVars: ShortBlogPostsGetVariables = {
    locale: params.locale,
    sort: validatedSort,
  };

  const contentLanguages = getRequestCookieHeader(request);
  if (contentLanguages.length) {
    blogPostsVars.filter = {
      ...blogPostsVars.filter,
      languageCodeIn: contentLanguages,
    };
  }

  await prefetchInfiniteShortBlogPosts(apiClient, queryClient, blogPostsVars);

  return { blogPostsVars };
};

const loadMeta = async (t: TFunction, tBlogPosts: TFunction<'blog_posts'>, params: Route.LoaderArgs['params']) => {
  // Breadcrumbs: Home → Blog
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: t('menu_items.blog.title'), to: '/blog' },
  ];

  return {
    breadcrumbs,
    canonicalUrl: addClientHost(addLocaleToPathname(getBlogPostsLink(), params.locale)),
    metaDescription: tBlogPosts('blog_posts_meta_description'),
    metaKeywords: combineMetaKeywords(t('meta_general_keywords'), tBlogPosts('blog_posts_meta_keywords')),
    metaTitle: getMetaTitle(tBlogPosts('blog_posts_meta_title'), t('meta_title_suffix')),
  };
};

export const loadBlogPostsRouteData = async (
  t: TFunction,
  tBlogPosts: TFunction<'blog_posts'>,
  { params, request }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const [shortBlogPostsLoadResult, metaLoadResult] = await Promise.all([
    loadPlogPosts({ apiClient, params, queryClient, request }),
    loadMeta(t, tBlogPosts, params),
  ]);

  return {
    ...shortBlogPostsLoadResult,
    ...metaLoadResult,
    dehydratedState: dehydrate(queryClient),
  };
};
