// common modules
import { mergeMeta } from '~/utils/meta';

// local modules
import { page as pageCn } from './page.module.scss';

export const meta = mergeMeta(() => []);

export default function BlogPostRoute() {
  return <div className={pageCn}>about page</div>;
}
