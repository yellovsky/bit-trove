import { dehydrate, type QueryClient } from '@tanstack/query-core';
import type { TFunction } from 'i18next';
import type { MetaDescriptor } from 'react-router';

import type { BlogPost } from '@repo/api-models';

import type { ApiClient } from '@shared/lib/api-client';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';
import { getMetaTitle } from '@shared/lib/meta';

import {
  getBlogPostBreadcrumbs,
  getBlogPostJsonLdMeta,
  getBlogPostLink,
  getBlogPostOgMeta,
  getBlogPostTwitterMeta,
} from '@features/blog-posts';
import { getMetaBreadcrumbs } from '@features/breadcrumbs';

import { type BlogPostGetVariables, prefetchBlogPostQuery } from '@entities/blog-posts';

import type { Route } from '../+types';

interface LoadDataParams {
  apiClient: ApiClient;
  queryClient: QueryClient;

  // Loader arguments
  loaderArgs: Route.LoaderArgs | Route.ClientLoaderArgs;

  // Translate functions
  t: TFunction;
}

/* -------------------------------------------------------------------------------------------------
 * Load blog post
 * -----------------------------------------------------------------------------------------------*/
type LoadPlogPostParams = LoadDataParams;

const loadBlogPost = async ({ apiClient, queryClient, loaderArgs }: LoadPlogPostParams) => {
  const { params } = loaderArgs;

  const getOneBlogPostVars: BlogPostGetVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const blogPostResponse = await prefetchBlogPostQuery(apiClient, queryClient, getOneBlogPostVars);

  return { blogPost: blogPostResponse.data, getOneBlogPostVars };
};

/* -------------------------------------------------------------------------------------------------
 * Load meta data
 * -----------------------------------------------------------------------------------------------*/
type LoadMetaParams = LoadDataParams & { blogPost: BlogPost };

const loadMeta = async ({ t, loaderArgs, blogPost }: LoadMetaParams) => {
  const { params } = loaderArgs;

  const breadcrumbs = getBlogPostBreadcrumbs(t, blogPost);

  const meta: MetaDescriptor[] = [
    // Basic meta tags
    { title: getMetaTitle(blogPost.seo?.title || blogPost.title, t('meta_title_suffix')) },
    { content: blogPost.seo?.keywords || '', name: 'keywords' },
    { content: blogPost.seo?.description || blogPost.shortDescription || '', name: 'description' },

    // Open Graph meta tags
    ...getBlogPostOgMeta(blogPost),

    // Twitter Card meta tags
    ...getBlogPostTwitterMeta(blogPost),

    // JSON-LD structured data
    getBlogPostJsonLdMeta(blogPost),

    // Canonical URL
    { href: addClientHost(addLocaleToPathname(getBlogPostLink(blogPost), params.locale)), rel: 'canonical' },

    // breadcrumbs
    getMetaBreadcrumbs(breadcrumbs, params.locale),
  ];

  return { breadcrumbs, meta };
};

/* -----------------------------------------------------------------------------------------------*/

export const loadBlogPostRouteData = async (loaderParams: LoadDataParams) => {
  const loadBlogPostResult = await loadBlogPost(loaderParams);
  const loadMetaResult = await loadMeta({ ...loaderParams, ...loadBlogPostResult });

  return {
    ...loadBlogPostResult,
    ...loadMetaResult,
    dehydratedState: dehydrate(loaderParams.queryClient),
  };
};
