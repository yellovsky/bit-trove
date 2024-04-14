// global modules
import { type FC, Suspense } from 'react';

// local modules
import { Ad } from '../../ad';
import { aside as asideCn } from './aside.module.scss';
import { AsideCategories, AsideCategoriesPending } from './aside-categories';

export const Aside: FC = () => (
  <div className={asideCn}>
    <Ad layout="square" />
    <Suspense fallback={<AsideCategoriesPending />}>
      <AsideCategories />
    </Suspense>
  </div>
);
