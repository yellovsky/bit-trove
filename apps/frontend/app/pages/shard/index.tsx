import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';
import { loadShardRouteData } from './model/load-data';
import { ShardPage } from './ui/ShardPage';

export async function loader(loaderArgs: Route.LoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = await appI18next.getFixedT(loaderArgs.params.locale);

  return loadShardRouteData({ apiClient, loaderArgs, queryClient, t });
}

export async function clientLoader(loaderArgs: Route.ClientLoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  await i18next.loadNamespaces('blog_posts');

  const t = i18next.getFixedT(loaderArgs.params.locale);
  return loadShardRouteData({ apiClient, loaderArgs, queryClient, t });
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  return params.data?.meta ?? [];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <ShardPage breadcrumbs={props.loaderData.breadcrumbs} shardVariables={props.loaderData.getOneShardVars} />
    </HydrationBoundary>
  );
}
