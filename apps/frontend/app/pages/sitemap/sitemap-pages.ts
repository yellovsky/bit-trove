import type { Route } from './+types';
import { UrlNode } from './model/url-node';
import { UrlSetNodes } from './model/urlset-nodes';

export const loader = async (_args: Route.LoaderArgs) => {
  const lastmod = new Date();

  const urlNodes: UrlNode[] = [
    UrlNode.from({ changefreq: 'monthly', lastmod, loc: '', priority: 0.5 }),
    UrlNode.from({ changefreq: 'monthly', lastmod, loc: '/blog', priority: 0.5 }),
    UrlNode.from({ changefreq: 'monthly', lastmod, loc: '/shards', priority: 0.5 }),
  ];

  return new Response(String(UrlSetNodes.from(urlNodes)), {
    headers: { 'Content-Type': 'application/xml', encoding: 'UTF-8', 'xml-version': '1.0' },
    status: 200,
  });
};
