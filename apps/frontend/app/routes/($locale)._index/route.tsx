// global modules
import { HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from '@remix-run/react';

// common modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getIndexLoaderData } from './load-data';
import { IndexPage } from './page';

export const loader = makeLoader(getIndexLoaderData);

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
