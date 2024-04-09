import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { content: 'Welcome to Remix!', name: 'description' }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      main
      <Outlet />
    </div>
  );
}
