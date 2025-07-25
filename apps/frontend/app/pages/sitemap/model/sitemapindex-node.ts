import type { SitemapNode } from './sitemap-node';

export class SitemapIndexNode {
  static from(sitemaps: SitemapNode[]) {
    return new SitemapIndexNode(sitemaps);
  }

  constructor(public readonly sitemaps: SitemapNode[]) {}

  toString() {
    return `
			<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${this.sitemaps.map((node) => node.toString()).join('')}
			</sitemapindex>
		`;
  }
}
