import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';
import { useLoaderData } from 'react-router';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';
import { getHomeJsonLdMeta, getHomeOgMeta, getHomeTwitterMeta } from './lib/seo-utils';
import { loadHomeRouteData } from './model/load-data';
import { HomePage } from './ui/HomePage';

export async function loader(args: Route.LoaderArgs) {
  const t = await appI18next.getFixedT('es');
  return loadHomeRouteData(t, args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('shards');
  const t = i18next.getFixedT('es');
  return loadHomeRouteData(t, args);
}

export function meta(params: Route.MetaArgs) {
  if (!params.data) return [];

  return [
    { title: params.data.metaTitle },
    { content: params.data.metaKeywords, name: 'keywords' },
    { content: params.data.metaDescription, name: 'description' },
    // Canonical URL
    { href: params.data.canonicalUrl, rel: 'canonical' },
    // Robots meta tag
    { content: 'index, follow, max-snippet:50', name: 'robots' },
    // Open Graph meta tags
    ...getHomeOgMeta(),
    // Twitter Card meta tags
    ...getHomeTwitterMeta(),
    // JSON-LD structured data
    getHomeJsonLdMeta(),
  ];
}

export default function HomeRoute() {
  const { dehydratedState, shardsVariables, blogPostsVariables } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage blogPostsVariables={blogPostsVariables} shardsVariables={shardsVariables} />
    </HydrationBoundary>
  );
}
