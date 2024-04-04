// global modules
import 'server-only';
import type { FC } from 'react';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { Ad } from '../ad';
import { aside as asideCn } from './aside.module.scss';
import { AsideCategories } from './aside-categories';

export const Aside: FC<{ locale: SupportedLocale }> = ({ locale }) => (
  <div className={asideCn}>
    <Ad layout="square" />
    <AsideCategories locale={locale} />
  </div>
);
