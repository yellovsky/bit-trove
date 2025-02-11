// common modules
import { mergeMeta } from '~/utils/meta';

// local modules
import { CMSTutorialsPage } from './page';

export const meta = mergeMeta(() => []);

export default function CMSTutorialsRoute() {
  return <CMSTutorialsPage />;
}
