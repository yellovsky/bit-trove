import { Loader } from '@mantine/core';
import { Outlet } from 'react-router';
import '@mantine/tiptap/styles.css';

import { SignInForm, useIsAuthorized } from '@features/auth';

import styles from './cms.module.css';

export default function CmsPageLayout() {
  const { isAuthorized, status } = useIsAuthorized();

  // TODO: add error state
  if (status !== 'success') {
    return (
      <div className={styles.centerContent}>
        <Loader size="xl" type="dots" />
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
