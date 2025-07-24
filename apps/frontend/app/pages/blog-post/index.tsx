import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';
import { loadBlogPostRouteData } from './model/load-data';
import { BlogPostPage } from './ui/BlogPostPage';

export async function loader(args: Route.LoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = await appI18next.getFixedT(args.params.locale);

  return loadBlogPostRouteData({ apiClient, loaderArgs: args, queryClient, t });
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  await i18next.loadNamespaces('blog_posts');

  const t = i18next.getFixedT(args.params.locale);
  return loadBlogPostRouteData({ apiClient, loaderArgs: args, queryClient, t });
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  return params.data?.meta ?? [];
}

export default function BlogPostRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <BlogPostPage
        blogPostVariables={props.loaderData.getOneBlogPostVars}
        breadcrumbs={props.loaderData.breadcrumbs}
      />
    </HydrationBoundary>
  );
}
