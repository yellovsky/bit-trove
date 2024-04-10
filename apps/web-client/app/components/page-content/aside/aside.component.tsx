// global modules
import type { FC } from 'react';

// local modules
import { Ad } from '../../ad';
import { AsideCategories } from './aside-categories';
import { aside as asideCn } from './aside.module.scss';

export const Aside: FC = () => (
  <div className={asideCn}>
    <Ad layout="square" />
    <AsideCategories />
  </div>
);
