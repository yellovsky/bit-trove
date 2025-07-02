import { LoaderIcon } from 'lucide-react';
import { Outlet } from 'react-router';

import { SignInForm, useIsAuthorized } from '@features/auth';

import styles from './cms.module.css';

export default function CmsPageLayout() {
  const { isAuthorized, status } = useIsAuthorized();

  // TODO: add error state
  if (status !== 'success') {
    return (
      <div className={styles.centerContent}>
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }

  return isAuthorized ? (
    <Outlet />
  ) : (
    <div className={styles.centerContent}>
      <SignInForm />
    </div>
  );
}
