import { HydrationBoundary } from '@tanstack/react-query';
import type { MetaDescriptor } from 'react-router';

import { getGlobal } from '@shared/lib/get-global';

import { getShardLink } from '@features/shards';

import { getShardJsonJdMeta, getShardOgMeta, getShardTwitterMeta } from '@entities/shards';

import type { Route } from './+types';
import { loadShardRouteData } from './lib/load-data';
import { ShardPage } from './ui/ShardPage';

export async function loader(args: Route.LoaderArgs) {
  return loadShardRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadShardRouteData(args);
}

export function meta(params: Route.MetaArgs): MetaDescriptor[] {
  if (!params.data) return [];

  const shard = params.data.shard;
  const clientHost = getGlobal('REMIX_PUBLIC_CLIENT_HOST');

  return [
    // Basic meta tags
    { title: shard.seo?.title || shard.title },
    { content: shard.seo?.keywords || '', name: 'keywords' },
    { content: shard.seo?.description || shard.shortDescription || '', name: 'description' },

    // Canonical URL
    { href: `${clientHost}${getShardLink(shard)}`, rel: 'canonical' },

    // Open Graph meta tags
    ...getShardOgMeta(shard),

    // Twitter Card meta tags
    ...getShardTwitterMeta(shard),

    // JSON-LD structured data
    getShardJsonJdMeta(shard),

    // Canonical URL
    { href: params.data.canonicalUrl, rel: 'canonical' },
  ];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <ShardPage shardVariables={props.loaderData.shardVariables} />
    </HydrationBoundary>
  );
}
