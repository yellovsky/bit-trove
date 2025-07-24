import { LoaderIcon } from 'lucide-react';
import { type MetaDescriptor, Outlet } from 'react-router';

import { filterParentMeta } from '@shared/lib/meta';

import { SignInForm, useIsAuthorized } from '@features/auth';

import type { Route } from './+types';
import styles from './cms.module.css';

export function meta(args: Route.MetaArgs): MetaDescriptor[] {
  const parentMeta = filterParentMeta(args.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { title: 'CMS' }, { content: 'noindex, nofollow', name: 'robots' }];
}

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
