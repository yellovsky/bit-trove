import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { filterParentMeta } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import { useContentLanguage } from '@features/language-switcher';

import type { Route } from './+types';
import { loadShardsRouteData } from './model/load-data';
import { ShardsPage } from './ui/ShardsPage';

export async function loader(args: Route.LoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = await appI18next.getFixedT(args.params.locale);
  const tShards = await appI18next.getFixedT(args.params.locale, 'shards');

  return loadShardsRouteData({ apiClient, loaderArgs: args, queryClient, t, tShards });
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  await i18next.loadNamespaces('shards');
  const t = i18next.getFixedT(args.params.locale);
  const tShards = i18next.getFixedT(args.params.locale, 'shards');

  return loadShardsRouteData({ apiClient, loaderArgs: args, queryClient, t, tShards });
}

export function meta(params: Route.MetaArgs) {
  const parentMeta = filterParentMeta(params.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { title: 'Shards' }];
}

export default function ShardsRoute(props: Route.ComponentProps) {
  const { languages } = useContentLanguage();

  const shardsVariables = {
    ...props.loaderData.shardsVars,
    filter: {
      ...props.loaderData.shardsVars.filter,
      languageCodeIn: languages,
    },
  };

  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <ShardsPage breadcrumbs={props.loaderData.breadcrumbs} shardsVariables={shardsVariables} />
    </HydrationBoundary>
  );
}
