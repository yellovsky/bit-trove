import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';

import appI18next from '@app/localization/i18n.server';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';
import { useContentLanguage } from '@features/language-switcher';

import type { Route } from './+types';
import { loadShardsRouteData } from './lib/load-data';
import { ShardsPage } from './ui/ShardsPage';

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
    // Canonical URL
    { href: params.data.canonicalUrl, rel: 'canonical' },
  ];
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
