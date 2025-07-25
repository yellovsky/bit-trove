import { SUPPORTED_LOCALES } from '@shared/config';
import { addClientHost, addLocaleToPathname } from '@shared/lib/link';

import { getLastMod } from '../lib/utils';

export interface UrlNodeData {
  loc: string;
  priority: number;
  changefreq: 'monthly' | 'weekly' | 'daily';
  lastmod: Date | number;
}

export class UrlNode {
  static from(data: UrlNodeData) {
    return new UrlNode(data.loc, data.priority, data.changefreq, data.lastmod);
  }

  constructor(
    public readonly loc: string,
    public readonly priority: number,
    public readonly changefreq: 'monthly' | 'weekly' | 'daily',
    public readonly lastmod: Date | number
  ) {}

  toString() {
    const makeUrlTag = (locale: string) => `
		  <url>
	  		<loc>${addClientHost(addLocaleToPathname(this.loc, locale))}</loc>
  			<priority>${this.priority}</priority>
			  <changefreq>${this.changefreq}</changefreq>
			  <lastmod>${getLastMod(this.lastmod)}</lastmod>
		  </url>
		`;

    return SUPPORTED_LOCALES.map(makeUrlTag).join('');
  }
}
