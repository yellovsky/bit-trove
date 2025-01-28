// global modules
import { HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

// common modules
import { getApiClient } from '~/api/api-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { IndexPage } from './page';
import { loadBlogRouteData, type LoaderData } from './load-data';

import { getQueryClient } from '../../query-client';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  return json<LoaderData>(await runAsyncEffect(loadBlogRouteData(apiClient, queryClient, params)));
};

export const meta = mergeMeta(() => []);

export default function BlogPostRoute() {
  const { blogPostFP, dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <IndexPage blogPostFP={blogPostFP} />
    </HydrationBoundary>
  );
}
