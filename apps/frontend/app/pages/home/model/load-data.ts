import { dehydrate, type QueryClient } from '@tanstack/react-query';
import type { TFunction } from 'i18next';
import type { MetaDescriptor } from 'react-router';

import type { ApiClient } from '@shared/lib/api-client';
import { getGlobal } from '@shared/lib/get-global';
import { getMetaTitle } from '@shared/lib/meta';

import { type AppBreadcrumb, getMetaBreadcrumbs } from '@features/breadcrumbs';
import { getRequestCookieHeader } from '@features/language-switcher';
import { DEFAULT_SHARDS_SORT } from '@features/shards';

import { prefetchInfiniteShortBlogPosts, type ShortBlogPostsGetVariables } from '@entities/blog-posts';
import { prefetchInfiniteShortShards, type ShortShardsGetVariables } from '@entities/shards';

import type { Route } from '../+types';
import { getHomeJsonLdMeta, getHomeOgMeta, getHomeTwitterMeta } from '../lib/seo-utils';

interface LoadDataParams {
  apiClient: ApiClient;
  queryClient: QueryClient;

  // Loader arguments
  loaderArgs: Route.LoaderArgs | Route.ClientLoaderArgs;

  // Translate functions
  t: TFunction;
}

/* -------------------------------------------------------------------------------------------------
 * Load short blog posts list
 * -----------------------------------------------------------------------------------------------*/
type LoadShardsParams = LoadDataParams;

const loadShards = async ({ apiClient, queryClient, loaderArgs }: LoadShardsParams) => {
  const { params, request } = loaderArgs;

  const contentLanguages = getRequestCookieHeader(request);
  const shardsVariables: ShortShardsGetVariables = {
    filter: { languageCodeIn: contentLanguages },
    locale: params.locale,
    sort: DEFAULT_SHARDS_SORT,
  };

  await prefetchInfiniteShortShards(apiClient, queryClient, shardsVariables);

  return { shardsVariables };
};

/* -------------------------------------------------------------------------------------------------
 * Load short blog posts list
 * -----------------------------------------------------------------------------------------------*/
type LoadBlogPostsParams = LoadDataParams;

const loadBlogPosts = async ({ apiClient, queryClient, loaderArgs }: LoadBlogPostsParams) => {
  const { params, request } = loaderArgs;

  const contentLanguages = getRequestCookieHeader(request);
  const blogPostsVariables: ShortBlogPostsGetVariables = {
    filter: { languageCodeIn: contentLanguages },
    locale: params.locale,
    sort: DEFAULT_SHARDS_SORT,
  };

  await prefetchInfiniteShortBlogPosts(apiClient, queryClient, blogPostsVariables);

  return { blogPostsVariables };
};

/* -------------------------------------------------------------------------------------------------
 * Load meta data
 * -----------------------------------------------------------------------------------------------*/
type LoadMetaParams = LoadDataParams;

const loadMeta = async ({ t, loaderArgs }: LoadMetaParams) => {
  // Breadcrumbs: Home → Shards
  const breadcrumbs: AppBreadcrumb[] = [{ label: t('menu_items.home.title'), to: '/' }];

  const meta: MetaDescriptor[] = [
    { title: getMetaTitle('', t('meta_title_suffix')) },
    { content: t('meta_general_keywords'), name: 'keywords' },
    { content: t('meta_general_description'), name: 'description' },
    // Canonical URL
    { href: getGlobal('REMIX_PUBLIC_CLIENT_HOST'), rel: 'canonical' },
    // Robots meta tag
    { content: 'index, follow, max-snippet:50', name: 'robots' },
    // Open Graph meta tags
    ...getHomeOgMeta(),
    // Twitter Card meta tags
    ...getHomeTwitterMeta(),
    // JSON-LD structured data
    getHomeJsonLdMeta(),
    // breadcrumbs
    getMetaBreadcrumbs(breadcrumbs, loaderArgs.params.locale),
  ];

  return { breadcrumbs, meta };
};

/* -----------------------------------------------------------------------------------------------*/

export const loadHomeRouteData = async (loaderParams: LoadDataParams) =>
  Promise.all([loadShards(loaderParams), loadBlogPosts(loaderParams), loadMeta(loaderParams)]).then(
    ([loadShardsResult, loadBlogPostsResult, loadMetaResult]) => ({
      ...loadShardsResult,
      ...loadBlogPostsResult,
      ...loadMetaResult,
      dehydratedState: dehydrate(loaderParams.queryClient),
    })
  );
