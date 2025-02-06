// global modules
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// common modules
import { getApiClient } from '~/api/api-client';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { BlogPostPage } from './page';
import { loadBlogPostRouteData } from './load-data';

export const loader = async (loaderArgs: LoaderFunctionArgs) => {
  const apiClient = getApiClient();
  return runAsyncEffect(loadBlogPostRouteData(apiClient, loaderArgs));
};

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function BlogPostRoute() {
  const { blogPostResponse } = useLoaderData<typeof loader>();
  return <BlogPostPage blogPost={blogPostResponse.data} />;
}
