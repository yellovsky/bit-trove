// common modules
import { makeLoader } from '~/utils/loader';
import { makeSeoMeta } from '~/utils/seo';
import { mergeMeta } from '~/utils/meta';

// local modules
import { getGuidesLoaderData } from './load-data';

export const loader = makeLoader(getGuidesLoaderData);

export const meta = mergeMeta<typeof loader>(params =>
  params.data ? makeSeoMeta(params.data.seo) : [],
);

export default function GuidesRoute() {
  return <div>guides</div>;
}
