import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import { Suspense } from 'react';
import { type MetaDescriptor, useRouteError } from 'react-router';

import { getApiClient } from '@shared/lib/api-client';
import { filterParentMeta } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';
import { loadShardRouteData } from './model/load-data';
import * as ShardPage from './ui/ShardPage';

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
  const parentMeta = filterParentMeta(params.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { title: 'Shard' }];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <Suspense fallback={<ShardPage.Loading />}>
      <HydrationBoundary state={props.loaderData?.dehydratedState}>
        <ShardPage.Root breadcrumbs={props.loaderData.breadcrumbs} shardVariables={props.loaderData.getOneShardVars} />
      </HydrationBoundary>
    </Suspense>
  );
}

export const ErrorBoundary = () => {
  const routeError = useRouteError();
  const isNotFound =
    routeError && typeof routeError === 'object' && 'status' in routeError && routeError.status === 404;

  if (isNotFound) return <ShardPage.NotFound />;
  return <ShardPage.ErrorState />;
};
