// global modules
import clsx from 'clsx';
import { Divider } from '@repo/ui/divider';
import { ThemeProvider } from '@repo/ui/theme-provider';
import { type FC, Suspense } from 'react';

// local modules
import { FooterCategories, FooterCategoriesPending } from './footer-categories';
import { footer as footerCn, pagePadding as pagePaddingCn } from './layout.module.scss';

export const Footer: FC = () => (
  <ThemeProvider colorMode="dark">
    <footer className={clsx(pagePaddingCn, footerCn)} color="gray.400">
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
  </ThemeProvider>
);
