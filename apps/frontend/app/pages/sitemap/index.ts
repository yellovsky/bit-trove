import type { Route } from './+types';
import { SitemapNode } from './model/sitemap-node';
import { SitemapIndexNode } from './model/sitemapindex-node';

export const loader = async (_args: Route.LoaderArgs) => {
  const lastmod = new Date();

  const sitemaps: SitemapNode[] = [
    SitemapNode.from({ lastmod, loc: '/sitemap/pages.xml' }),
    SitemapNode.from({ lastmod, loc: '/sitemap/articles.xml' }),
  ];

  const sitemapIndex = SitemapIndexNode.from(sitemaps);

  return new Response(String(sitemapIndex), {
    headers: { 'Content-Type': 'application/xml', encoding: 'UTF-8', 'xml-version': '1.0' },
    status: 200,
  });
};
