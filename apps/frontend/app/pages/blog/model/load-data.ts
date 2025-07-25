import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';
import type { MetaDescriptor } from 'react-router';

import { type ShortArticlesGetSort, shortArticlesGetSortSchema } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { combineMetaKeywords, getAlternateMetaDescriptors, getMetaTitle } from '@shared/lib/meta';

import {
  DEFAULT_BLOG_POST_SORT,
  getBlogBreadcrumbs,
  getBlogPostsJsonLdMeta,
  getBlogPostsLink,
  getBlogPostsOgMeta,
  getBlogPostsTwitterMeta,
} from '@features/blog-posts';
import { getMetaBreadcrumbs } from '@features/breadcrumbs';
import { getRequestCookieHeader } from '@features/language-switcher';

import { prefetchInfiniteShortBlogPosts, type ShortBlogPostsGetVariables } from '@entities/blog-posts';

import type { Route } from '../+types';

interface LoadDataParams {
  apiClient: ApiClient;
  queryClient: QueryClient;

  // Loader arguments
  loaderArgs: Route.LoaderArgs | Route.ClientLoaderArgs;

  // Translate functions
  t: TFunction;
  tBlogPosts: TFunction<'blog_posts'>;
}

/* -------------------------------------------------------------------------------------------------
 * Load short blog posts list
 * -----------------------------------------------------------------------------------------------*/
type LoadPlogPostsParams = LoadDataParams;

const loadPlogPosts = async ({ apiClient, queryClient, loaderArgs }: LoadPlogPostsParams) => {
  const { params, request } = loaderArgs;

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

/* -------------------------------------------------------------------------------------------------
 * Load meta data
 * -----------------------------------------------------------------------------------------------*/
type LoadMetaParams = LoadDataParams;

const loadMeta = async ({ t, tBlogPosts, loaderArgs }: LoadMetaParams) => {
  const { params } = loaderArgs;

  // Breadcrumbs: Home → Blog
  const breadcrumbs = getBlogBreadcrumbs(t);

  const meta: MetaDescriptor[] = [
    { title: getMetaTitle(tBlogPosts('blog_posts_meta_title'), t('meta_title_suffix')) },
    {
      content: combineMetaKeywords(t('meta_general_keywords'), tBlogPosts('blog_posts_meta_keywords')),
      name: 'keywords',
    },
    { content: tBlogPosts('blog_posts_meta_description'), name: 'description' },
    ...getBlogPostsOgMeta(),
    ...getBlogPostsTwitterMeta(),
    getBlogPostsJsonLdMeta(),
    getMetaBreadcrumbs(breadcrumbs, params.locale),
    { href: addClientHost(addLocaleToPathname(getBlogPostsLink(), params.locale)), rel: 'canonical' },
    ...getAlternateMetaDescriptors(params.locale, getBlogPostsLink()),
  ];

  return { breadcrumbs, meta };
};

/* -----------------------------------------------------------------------------------------------*/

export const loadBlogPostsRouteData = async (loaderParams: LoadDataParams) =>
  Promise.all([loadPlogPosts(loaderParams), loadMeta(loaderParams)])
    .then(([shortBlogPostsLoadResult, metaLoadResult]) => ({ ...shortBlogPostsLoadResult, ...metaLoadResult }))
    .then((data) => ({ ...data, dehydratedState: dehydrate(loaderParams.queryClient) }));
