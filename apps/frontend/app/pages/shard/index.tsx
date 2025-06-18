import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import type { MetaDescriptor } from 'react-router';

import appI18next from '@app/localization/i18n.server';

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

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  const metaTags: MetaDescriptor[] = [{ title: params.data.metaTitle }];

  if (params.data.metaKeywords) metaTags.push({ content: params.data.metaKeywords, name: 'keywords' });
  if (params.data.metaDescription) metaTags.push({ content: params.data.metaDescription, name: 'description' });

  return [
    ...metaTags,
    getShardJsonJdMeta(params.data.shard),
    ...getShardOgMeta(params.data.shard),
    ...getShardTwitterMeta(params.data.shard),
  ];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <ShardPage shardVariables={props.loaderData.getOneShardVars} />
    </HydrationBoundary>
  );
}
