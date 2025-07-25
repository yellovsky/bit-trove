import type { UrlNode } from './url-node';

export class UrlSetNodes {
  static from(nodes: UrlNode[]) {
    return new UrlSetNodes(nodes);
  }

  constructor(public readonly nodes: UrlNode[]) {}

  toString() {
    return `
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${this.nodes.map((node) => node.toString()).join('')}
			</urlset>
		`;
  }
}
