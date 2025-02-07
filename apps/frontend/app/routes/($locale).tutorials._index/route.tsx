// common modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getTutorialsRouteLoaderData } from './load-data';

export const loader = makeLoader(getTutorialsRouteLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function TutorialsRoute() {
  return <div>tutorials</div>;
}
