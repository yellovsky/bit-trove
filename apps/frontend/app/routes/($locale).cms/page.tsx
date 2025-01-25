// global modules
import type { FC } from 'react';
import { Outlet } from '@remix-run/react';

// common modules
import { SignInForm } from '~/components/forms/sign-in';
import { useLoggedIn } from '~/utils/auth';

// local modules
import { formHolder as formHolderCn } from './route.module.scss';

export const CmsPage: FC = () => {
  const loggedIn = useLoggedIn();

  return loggedIn ? (
    <Outlet />
  ) : (
    <div className={formHolderCn}>
      <SignInForm />
    </div>
  );
};
