// global modules
import { useLoaderData } from '@remix-run/react';

// local modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getTutorialRouteLoaderData } from './load-data';
import { TutorialPage } from './page';

export const loader = makeLoader(getTutorialRouteLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function TutorialRoute() {
  const { tutorialResponse } = useLoaderData<typeof loader>();

  return <TutorialPage tutorial={tutorialResponse.data} />;
}
