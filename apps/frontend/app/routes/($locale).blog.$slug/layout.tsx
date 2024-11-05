// global modules
import type { FC, PropsWithChildren } from 'react';

// local modules
import { page as pageCn } from './page.module.scss';

interface BlogpostPageLayoutProps extends PropsWithChildren {}

export const BlogpostPageLayout: FC<BlogpostPageLayoutProps> = ({ children }) => {
  return (
    <div className={pageCn}>
      <div>{children}</div>
      <div>aside</div>
    </div>
  );
};
