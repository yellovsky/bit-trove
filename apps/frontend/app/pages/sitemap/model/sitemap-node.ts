import { addClientHost } from '@shared/lib/link';

import { getLastMod } from '../lib/utils';

interface SitemapNodeData {
  loc: string;
  lastmod: Date | number;
}

export class SitemapNode {
  static from(data: SitemapNodeData) {
    return new SitemapNode(data.loc, data.lastmod);
  }

  constructor(
    public readonly loc: string,
    public readonly lastmod: Date | number
  ) {}

  toString() {
    return `
			<sitemap>
				<loc>${addClientHost(this.loc)}</loc>
				<lastmod>${getLastMod(this.lastmod)}</lastmod>
			</sitemap>
		`;
  }
}
