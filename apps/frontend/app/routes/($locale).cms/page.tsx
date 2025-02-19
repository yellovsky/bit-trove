// global modules
import type { FC } from 'react';
import { Outlet } from '@remix-run/react';

// common modules
import { LoadingScreen } from '~/components/screens/loading';
import { SignInForm } from '~/components/forms/sign-in';
import { useAuthStatus } from '~/utils/auth';

// local modules
import { formHolder as formHolderCn } from './route.module.scss';

export const CmsPage: FC = () => {
  const authStatus = useAuthStatus();

  return authStatus === 'pending' ? (
    <LoadingScreen />
  ) : authStatus === 'authorized' ? (
    <Outlet />
  ) : (
    <div className={formHolderCn}>
      <SignInForm />
    </div>
  );
};
