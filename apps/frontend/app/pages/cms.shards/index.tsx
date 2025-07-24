import type { MetaDescriptor } from 'react-router';

import { filterParentMeta } from '@shared/lib/meta';

import type { Route } from './+types';
import { CmsShardsPage } from './ui/CmsShardsPage';

export function meta(args: Route.MetaArgs): MetaDescriptor[] {
  const parentMeta = filterParentMeta(args.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { title: 'CMS Shards' }];
}

export const handle = {
  i18n: ['cms', 'cms_articles', 'shards'],
};

export default function CMSShardsRoute(_props: Route.ComponentProps) {
  return <CmsShardsPage />;
}
