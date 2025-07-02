import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import appI18next from '@app/localization/i18n.server';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';

import { getShardJsonJdMeta, getShardOgMeta, getShardTwitterMeta } from '@entities/shards';

import type { Route } from './+types';
import { loadShardRouteData } from './load-data';
import { ShardPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  const t = await appI18next.getFixedT(args.params.locale);
  return loadShardRouteData(t, args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('common');
  const t = i18next.getFixedT(args.params.locale);
  return loadShardRouteData(t, args);
}

export function meta({ data, params }: Route.MetaArgs): MetaDescriptor[] {
  if (!data) return [];

  const metaTags: MetaDescriptor[] = [{ title: data.metaTitle }];

  if (data.metaKeywords) metaTags.push({ content: data.metaKeywords, name: 'keywords' });
  if (data.metaDescription) metaTags.push({ content: data.metaDescription, name: 'description' });

  return [
    ...metaTags,
    getShardJsonJdMeta(data.shard),
    ...getShardOgMeta(data.shard),
    ...getShardTwitterMeta(data.shard),
    getMetaBreadcrumbs(data.breadcrumbs, params.locale),
  ];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <ShardPage breadcrumbs={props.loaderData.breadcrumbs} shardVariables={props.loaderData.getOneShardVars} />
    </HydrationBoundary>
  );
}
