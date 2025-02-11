// common modules
import { mergeMeta } from '~/utils/meta';

// local modules
import { CMSBlogPage } from './page';

export const meta = mergeMeta(() => []);

export default function CMSBlogRoute() {
  return <CMSBlogPage />;
}
