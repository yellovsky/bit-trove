import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';

import { getApiClient } from '@shared/lib/api-client';
import { filterParentMeta } from '@shared/lib/meta';
import { getQueryClient } from '@shared/lib/query-client';

import appI18next from '@app/localization/i18n.server';

import { useContentLanguage } from '@features/language-switcher';

import type { Route } from './+types';
import { loadHomeRouteData } from './model/load-data';
import { HomePage } from './ui/HomePage';

export async function loader(args: Route.LoaderArgs) {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = await appI18next.getFixedT(args.params.locale);
  return loadHomeRouteData({ apiClient, loaderArgs: args, queryClient, t });
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('shards');
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const t = i18next.getFixedT(args.params.locale);
  return loadHomeRouteData({ apiClient, loaderArgs: args, queryClient, t });
}

export function meta(params: Route.MetaArgs) {
  const parentMeta = filterParentMeta(params.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, ...(params.data?.meta ?? [])];
}

export default function HomeRoute(props: Route.ComponentProps) {
  const { languages } = useContentLanguage();

  const blogPostsVariables = {
    ...props.loaderData.blogPostsVariables,
    filter: {
      ...props.loaderData.blogPostsVariables.filter,
      languageCodeIn: languages,
    },
  };

  const shardsVariables = {
    ...props.loaderData.shardsVariables,
    filter: {
      ...props.loaderData.shardsVariables.filter,
      languageCodeIn: languages,
    },
  };

  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <HomePage blogPostsVariables={blogPostsVariables} shardsVariables={shardsVariables} />
    </HydrationBoundary>
  );
}
