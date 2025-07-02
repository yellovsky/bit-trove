import i18next from 'i18next';

import appI18next from '@app/localization/i18n.server';

import type { Route } from './+types';
import { loadHomeRouteData } from './load-data';

export async function loader(_args: Route.LoaderArgs) {
  const t = await appI18next.getFixedT('es');
  return loadHomeRouteData(t);
}

export async function clientLoader(_args: Route.ClientLoaderArgs) {
  await i18next.loadNamespaces('shards');
  const t = i18next.getFixedT('es');
  return loadHomeRouteData(t);
}

export function meta(params: Route.MetaArgs) {
  if (!params.data) return [];

  return [
    { title: params.data.metaTitle },
    { content: params.data.metaKeywords, name: 'keywords' },
    { content: params.data.metaDescription, name: 'description' },
  ];
}

export default function HomeRoute() {
  return <div>home page</div>;
}
