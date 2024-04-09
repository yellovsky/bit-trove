// global modules
import { Outlet } from '@remix-run/react';

// local modules
import { MainMenu } from './main-menu';

export default function IndexLayout() {
  return (
    <>
      <MainMenu />
      <Outlet />
    </>
  );
}
