// global modules
import { HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

// common modules
import { getApiClient } from '~/api/api-client';
import { getQueryClient } from '~/query-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { IndexPage } from './page';
import { loadBlogRouteData, type LoaderData } from './load-data';

export const loader = async (loaderArgs: LoaderFunctionArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  return json<LoaderData>(
    await runAsyncEffect(loadBlogRouteData(apiClient, queryClient, loaderArgs)),
  );
};

export const meta = mergeMeta<typeof loader>(params => [
  { title: params.data?.pageSEOTitle },
  { content: params.data?.pageSEODescription, name: 'description' },
  { content: params.data?.pageSEOKeywords, name: 'keywords' },
]);

export default function BlogPostRoute() {
  const { blogPostFP, dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <IndexPage blogPostFP={blogPostFP} />
    </HydrationBoundary>
  );
}
