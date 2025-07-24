import type { MetaDescriptor } from 'react-router';

import { filterParentMeta } from '@shared/lib/meta';

import type { Route } from './+types';
import { CmsBlogPostsPage } from './ui/CmsBlogPostsPage';

export function meta(args: Route.MetaArgs): MetaDescriptor[] {
  const parentMeta = filterParentMeta(args.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { title: 'CMS Blog Posts' }];
}

export const handle = {
  i18n: ['cms', 'cms_articles', 'blog_posts'],
};

export default function CMSBlogPostsRoute() {
  return <CmsBlogPostsPage />;
}
