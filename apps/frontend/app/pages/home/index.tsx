import { HydrationBoundary } from '@tanstack/react-query';
import i18next from 'i18next';

import appI18next from '@app/localization/i18n.server';

import { getMetaBreadcrumbs } from '@features/breadcrumbs';
import { useContentLanguage } from '@features/language-switcher';

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
    // breadcrumbs
    getMetaBreadcrumbs(params.data.breadcrumbs, params.params.locale),
  ];
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
