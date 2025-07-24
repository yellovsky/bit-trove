import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import { useContentLanguage } from '@features/language-switcher';

import type { Route } from './+types';
import { loadBlogPostsRouteData } from './model/load-data';
import { BlogPostsPage } from './ui/BlogPostsPage';

export async function loader(loaderArgs: Route.LoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = await appI18next.getFixedT(loaderArgs.params.locale);
  const tBlogPosts = await appI18next.getFixedT(loaderArgs.params.locale, 'blog_posts');

  return loadBlogPostsRouteData({ apiClient, loaderArgs, queryClient, t, tBlogPosts });
}

export async function clientLoader(loaderArgs: Route.ClientLoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  await i18next.loadNamespaces('blog_posts');

  const t = i18next.getFixedT(loaderArgs.params.locale);
  const tBlogPosts = i18next.getFixedT(loaderArgs.params.locale, 'blog_posts');

  return loadBlogPostsRouteData({ apiClient, loaderArgs, queryClient, t, tBlogPosts });
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  return params.data?.meta ?? [];
}

export default function BlogRoure(props: Route.ComponentProps) {
  const { languages } = useContentLanguage();

  const filteredBlogPostsVars = {
    ...props.loaderData.blogPostsVars,
    filter: {
      ...props.loaderData.blogPostsVars.filter,
      languageCodeIn: languages,
    },
  };

  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <BlogPostsPage blogPostsVars={filteredBlogPostsVars} breadcrumbs={props.loaderData.breadcrumbs} />
    </HydrationBoundary>
  );
}
