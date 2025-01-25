// common modules
import { mergeMeta } from '~/utils/meta';

// local modules
import { CMSBlogPage } from './page';

export const meta = mergeMeta(() => []);

export const handle = {
  i18n: ['blog-cms'],
};

export default function CMSBlogRoute() {
  return <CMSBlogPage />;
}
