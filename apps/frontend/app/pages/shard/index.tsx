import { HydrationBoundary } from '@tanstack/react-query';

import type { Route } from './+types';
import { loadShardRouteData } from './load-data';
import { ShardPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  return loadShardRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadShardRouteData(args);
}

export function meta(params: Route.MetaArgs) {
  return [
    { title: params.data.shard.seo.title || params.data.shard.title },
    { content: params.data.shard.seo.keywords, name: 'keywords' },
    { content: params.data.shard.seo.description, name: 'description' },
  ];
}

export default function ShardRoute(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <ShardPage shardVariables={props.loaderData.getOneShardVars} />
    </HydrationBoundary>
  );
}
