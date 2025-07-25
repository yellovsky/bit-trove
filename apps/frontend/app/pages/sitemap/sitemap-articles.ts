import * as R from 'ramda';

import { PAGE_SIZE } from '@shared/config';
import { getApiClient } from '@shared/lib/api-client';

import { getShortArticlesApi } from '@entities/articles';

import type { Route } from './+types';
import { SITEMAP_PAGE_SIZE } from './model/constants';
import { SitemapNode } from './model/sitemap-node';
import { SitemapIndexNode } from './model/sitemapindex-node';

export const loader = async (_args: Route.LoaderArgs) => {
  const apiClient = getApiClient();
  const blogPosts = await getShortArticlesApi(apiClient, {
    locale: 'en',
    page: { limit: PAGE_SIZE, offset: 0 },
    sort: '-createdAt',
  });

  const pagesCount = Math.ceil(blogPosts.data.pagination.total / SITEMAP_PAGE_SIZE);
  const lastmod = new Date();

  const sitemaps: SitemapNode[] = R.times(
    (i) => SitemapNode.from({ lastmod, loc: `/sitemap/articles/${i + 1}.xml` }),
    pagesCount
  );

  return new Response(String(SitemapIndexNode.from(sitemaps)), {
    headers: { 'Content-Type': 'application/xml', encoding: 'UTF-8', 'xml-version': '1.0' },
    status: 200,
  });
};
