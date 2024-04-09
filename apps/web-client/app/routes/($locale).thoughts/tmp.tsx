// import { Link, Outlet, LoaderFunction } from 'remix';
// import { i18n } from '../../lib/i18n.server';
// import { Trans, useTranslation } from 'react-i18next';

import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const loader: LoaderFunction = async function loader() {
  return {
    // i18n: await i18n.getTranslations(request, 'usersIndex'),
  };
};

export default function UsersIndex() {
  return (
    <p>
      apps/web-client/app/routes/thoughts._index/route.tsx
      <Outlet />
    </p>
  );
}
