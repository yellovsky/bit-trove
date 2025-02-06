// global modules
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// local modules
import { getApiClient } from '~/api/api-client';
import { mergeMeta } from '~/utils/meta';
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { GuidePage } from './page';
import { type LoaderData, loadGuideRouteData } from './load-data';

export const loader = async (loaderArgs: LoaderFunctionArgs): Promise<LoaderData> => {
  const apiClient = getApiClient();
  return runAsyncEffect(loadGuideRouteData(apiClient, loaderArgs));
};

export const meta = mergeMeta<typeof loader>(params => [
  { title: params.data?.pageSEOTitle },
  { content: params.data?.pageSEODescription, name: 'description' },
  { content: params.data?.pageSEOKeywords, name: 'keywords' },
]);

export default function GuideRoute() {
  const { guideResponse } = useLoaderData<typeof loader>();

  return <GuidePage guide={guideResponse.data} />;
}
