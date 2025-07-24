import { dehydrate, type QueryClient } from '@tanstack/react-query';
import type { TFunction } from 'i18next';

import { type ApiClient, getApiClient } from '@shared/lib/api-client';
import { getGlobal } from '@shared/lib/get-global';
import { getMetaTitle } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import type { AppBreadcrumb } from '@features/breadcrumbs';
import { getRequestCookieHeader } from '@features/language-switcher';
import { DEFAULT_SHARDS_SORT } from '@features/shards';

import { prefetchInfiniteShortBlogPosts, type ShortBlogPostsGetVariables } from '@entities/blog-posts';
import { prefetchInfiniteShortShards, type ShortShardsGetVariables } from '@entities/shards';

import type { Route } from '../+types';

type LoadShardsOrBlogPostsOptions = {
  apiClient: ApiClient;
  queryClient: QueryClient;
  request: Request;
  params: Route.LoaderArgs['params'];
};

const loadShards = async ({ apiClient, queryClient, request, params }: LoadShardsOrBlogPostsOptions) => {
  const contentLanguages = getRequestCookieHeader(request);
  const shardsVariables: ShortShardsGetVariables = {
    filter: { languageCodeIn: contentLanguages },
    locale: params.locale,
    sort: DEFAULT_SHARDS_SORT,
  };

  await prefetchInfiniteShortShards(apiClient, queryClient, shardsVariables);

  return { shardsVariables };
};

const loadBlogPosts = async ({ apiClient, queryClient, request, params }: LoadShardsOrBlogPostsOptions) => {
  const contentLanguages = getRequestCookieHeader(request);
  const blogPostsVariables: ShortBlogPostsGetVariables = {
    filter: { languageCodeIn: contentLanguages },
    locale: params.locale,
    sort: DEFAULT_SHARDS_SORT,
  };

  await prefetchInfiniteShortBlogPosts(apiClient, queryClient, blogPostsVariables);

  return { blogPostsVariables };
};

const loadMeta = async (t: TFunction) => {
  // Breadcrumbs: Home → Shards
  const breadcrumbs: AppBreadcrumb[] = [{ label: t('menu_items.home.title'), to: '/' }];

  return {
    breadcrumbs,
    canonicalUrl: getGlobal('REMIX_PUBLIC_CLIENT_HOST'),
    metaDescription: t('meta_general_description'),
    metaKeywords: t('meta_general_keywords'),
    metaTitle: getMetaTitle('', t('meta_title_suffix')),
  };
};

export const loadHomeRouteData = async (
  t: TFunction,
  { params, request }: Route.LoaderArgs | Route.ClientLoaderArgs
) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const [loadShardsResult, loadBlogPostsResult, loadMetaResult] = await Promise.all([
    loadShards({ apiClient, params, queryClient, request }),
    loadBlogPosts({ apiClient, params, queryClient, request }),
    loadMeta(t),
  ]);

  return {
    ...loadShardsResult,
    ...loadBlogPostsResult,
    ...loadMetaResult,
    dehydratedState: dehydrate(queryClient),
  };
};
