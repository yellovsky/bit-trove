// global modules
import { HydrationBoundary } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// common modules
import { getApiClient } from '~/api/api-client';
import { getQueryClient } from '~/query-client';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { IndexPage } from './page';
import { loadBlogRouteData } from './load-data';

export const loader = async (loaderArgs: LoaderFunctionArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();
  return runAsyncEffect(loadBlogRouteData(apiClient, queryClient, loaderArgs));
};

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function BlogPostRoute() {
  const { blogPostFP, guidesFP, dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <IndexPage blogPostFP={blogPostFP} guidesFP={guidesFP} />
    </HydrationBoundary>
  );
}
