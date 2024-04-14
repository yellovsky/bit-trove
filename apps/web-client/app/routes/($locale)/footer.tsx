// global modules
import { Divider } from '@bit-trove/ui/divider';
import { type FC, Suspense } from 'react';

// local modules
import { pagePadding as pagePaddingCn } from './layout.module.scss';
import { FooterCategories, FooterCategoriesPending } from './footer-categories';

export const Footer: FC = () => (
  <footer className={pagePaddingCn} color="gray.400">
    <div>
      <Suspense fallback={<FooterCategoriesPending />}>
        <FooterCategories />
      </Suspense>
    </div>

    <Divider />

    <div>
      <div>Find your trove</div>
      <div>links</div>
      <div>newsletter</div>
    </div>

    <Divider />
    <div>copyrigt d </div>
  </footer>
);
