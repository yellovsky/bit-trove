import { isShortBlogPost, isShortShard } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

import { getBlogPostLink } from '@features/blog-posts';
import { getShardLink } from '@features/shards';

import { getShortArticlesApi } from '@entities/articles';

import type { Route } from './+types/sitemap-articles-page';
import { SITEMAP_PAGE_SIZE } from './model/constants';
import { UrlNode } from './model/url-node';
import { UrlSetNodes } from './model/urlset-nodes';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const apiClient = getApiClient();
  const blogPosts = await getShortArticlesApi(apiClient, {
    locale: 'en',
    page: { limit: SITEMAP_PAGE_SIZE, offset: (Number(params.index) - 1) * SITEMAP_PAGE_SIZE },
    sort: '-createdAt',
  });

  const lastmod = new Date();

  const urlNodes: UrlNode[] = blogPosts.data.items
    .map((item) => {
      const loc = isShortBlogPost(item) ? getBlogPostLink(item) : isShortShard(item) ? getShardLink(item) : null;
      return !loc ? null : UrlNode.from({ changefreq: 'monthly', lastmod, loc, priority: 0.5 });
    })
    .filter((val) => !!val);

  if (!urlNodes.length && Number(params.index) > 1) throw new Response('Not found', { status: 404 });

  return new Response(String(UrlSetNodes.from(urlNodes)), {
    headers: { 'Content-Type': 'application/xml', encoding: 'UTF-8', 'xml-version': '1.0' },
    status: 200,
  });
};
