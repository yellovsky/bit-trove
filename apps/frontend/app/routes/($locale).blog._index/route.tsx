// global modules
import { useLoaderData } from '@remix-run/react';

// common modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { BlogPage } from './page';
import { getBlogLoaderData } from './load-data';

export const loader = makeLoader(getBlogLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function BlogPostRoute() {
  const { blogPostListResponse } = useLoaderData<typeof loader>();
  return <BlogPage blogPostListResponse={blogPostListResponse} />;
}
