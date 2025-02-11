// common modules
import { ClientOnly } from 'remix-utils/client-only';
import { mergeMeta } from '~/utils/meta';

// local modules
import { CmsPage } from './page';

export const meta = mergeMeta(() => []);

export const handle = {
  i18n: ['zod', 'cms'],
};

export default function CMSRoute() {
  return <ClientOnly>{() => <CmsPage />}</ClientOnly>;
}
