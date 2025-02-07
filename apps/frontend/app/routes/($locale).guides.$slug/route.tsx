// global modules
import { useLoaderData } from '@remix-run/react';

// local modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getGuideLoaderData } from './load-data';
import { GuidePage } from './page';

export const loader = makeLoader(getGuideLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function GuideRoute() {
  const { guideResponse } = useLoaderData<typeof loader>();

  return <GuidePage guide={guideResponse.data} />;
}
