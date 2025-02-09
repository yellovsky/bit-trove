// global modules
import { HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from '@remix-run/react';

// local modules
import { makeLoader } from '~/utils/loader.server';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getTutorialRouteLoaderData } from './load-data.server';
import { TutorialPage } from './page';

export const loader = makeLoader(getTutorialRouteLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function TutorialRoute() {
  const { dehydratedState, tutorialVariables } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <TutorialPage tutorialVariables={tutorialVariables} />
    </HydrationBoundary>
  );
}
