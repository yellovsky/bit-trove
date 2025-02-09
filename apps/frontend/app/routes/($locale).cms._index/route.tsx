// common modules
import { mergeMeta } from '~/utils/meta';
import { useLogout } from '~/utils/auth';

// local modules
import { page as pageCn } from './page.module.scss';

export const meta = mergeMeta(() => []);

export default function BlogPostRoute() {
  const handleLogout = useLogout();

  return (
    <div className={pageCn}>
      index
      <br />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
