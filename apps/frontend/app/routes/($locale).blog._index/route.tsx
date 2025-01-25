// global modules
import { useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

// common modules
import { getApiClient } from '~/api/api-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { BlogPage } from './page';
import { loadBlogRouteData, type LoaderData } from './load-data';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiClient = getApiClient();
  return json<LoaderData>(await runAsyncEffect(loadBlogRouteData(apiClient, params)));
};

export const meta = mergeMeta(() => []);

export default function BlogPostRoute() {
  const { blogPostListResponse } = useLoaderData<typeof loader>();
  return <BlogPage blogPostListResponse={blogPostListResponse} />;
}
