import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import { useLoaderData } from 'react-router';

import appI18next from '@app/localization/i18n.server';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';

import type { Route } from './+types';
import { loadShardsRouteData } from './load-data';
import { ShardsPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  const t = await appI18next.getFixedT(args.params.locale);
  const tShards = await appI18next.getFixedT(args.params.locale, 'shards');

  return loadShardsRouteData(t, tShards, args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('shards');
  const t = i18next.getFixedT(args.params.locale);
  const tShards = i18next.getFixedT(args.params.locale, 'shards');

  return loadShardsRouteData(t, tShards, args);
}

export function meta(params: Route.MetaArgs) {
  if (!params.data) return [];

  return [
    { title: params.data.metaTitle },
    { content: params.data.metaKeywords, name: 'keywords' },
    { content: params.data.metaDescription, name: 'description' },
    getMetaBreadcrumbs(params.data.breadcrumbs, params.params.locale),
  ];
}

export default function ShardsRoute() {
  const { dehydratedState, shardsVariables, breadcrumbs } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <ShardsPage breadcrumbs={breadcrumbs} shardsVariables={shardsVariables} />
    </HydrationBoundary>
  );
}
