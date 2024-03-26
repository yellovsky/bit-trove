// global modules
import type { FC } from 'react';

// local modules
import { Ad } from '../ad';
import { aside as asideCn } from './aside.module.scss';
import { AsideCategories } from '../aside-categories/aside-categories.component';

export const Aside: FC = () => (
  <div className={asideCn}>
    <Ad layout="square" />
    <AsideCategories />
  </div>
);
