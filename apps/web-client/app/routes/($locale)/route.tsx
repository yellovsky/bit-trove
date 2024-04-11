// global modules
import { Outlet } from '@remix-run/react';

// local modules
import { Footer } from './footer';
import { layout as layoutCn, tmp as tmpCn } from './layout.module.scss';
import { MainMenu } from './main-menu';

export default function IndexLayout() {
  return (
    <div className={layoutCn + ' ' + tmpCn}>
      <MainMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
