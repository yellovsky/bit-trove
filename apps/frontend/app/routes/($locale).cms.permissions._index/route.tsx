// common modules
import { mergeMeta } from '~/utils/meta';

// local modules
import { CMSPermissionsPage } from './page';

export const meta = mergeMeta(() => []);

export default function CMSPermissionsRoute() {
  return <CMSPermissionsPage />;
}
