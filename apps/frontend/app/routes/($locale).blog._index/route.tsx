// global modules
import { useLoaderData } from '@remix-run/react';

// common modules
import { makeLoader } from '~/utils/loader.server';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { BlogPage } from './page';
import { getBlogLoaderData } from './load-data.server';
import { HydrationBoundary } from '@tanstack/react-query';

export const loader = makeLoader(getBlogLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function BlogPostRoute() {
  const { dehydratedState, blogPostListVariables } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogPage blogPostListVariables={blogPostListVariables} />
    </HydrationBoundary>
  );
}
