// global modules
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// common modules
import { getApiClient } from '~/api/api-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { BlogPostPage } from './page';
import { loadBlogPostRouteData, type LoaderData } from './load-data';

export const loader = async (loaderArgs: LoaderFunctionArgs): Promise<LoaderData> => {
  const apiClient = getApiClient();
  return runAsyncEffect(loadBlogPostRouteData(apiClient, loaderArgs));
};

export const meta = mergeMeta<typeof loader>(params => [
  { title: params.data?.pageSEOTitle },
  { content: params.data?.pageSEODescription, name: 'description' },
  { content: params.data?.pageSEOKeywords, name: 'keywords' },
]);

export default function BlogPostRoute() {
  const { blogPostResponse } = useLoaderData<typeof loader>();
  return <BlogPostPage blogPost={blogPostResponse.data} />;
}
