// global modules
import cn from 'classnames';
import type { FC } from 'react';
import Image from 'next/image';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import { FooterCategories } from './footer-categories';

import {
  categoryStripe as categoryStripeCn,
  copyrightHolder as copyrightHolderCn,
  logo as logoCn,
  mainStripe as mainStripeCn,
  pagePadding as pagePaddingCn,
  slogan as sloganCn,
  socialHolder as socialHolderCn,
  socialMediaPlaceholder as socialMediaPlaceholderCn,
} from './footer.module.scss';

interface FooterProps {
  locale: SupportedLocale;
}

export const Footer: FC<FooterProps> = ({ locale }) => (
  <footer>
    <FooterCategories className={cn(pagePaddingCn, categoryStripeCn)} locale={locale} />

    <div className={cn(pagePaddingCn, mainStripeCn)}>
      <div>
        <Image alt="logo" className={logoCn} height={75} src="/assets/logo.svg" width={97} />
        <div className={sloganCn}>Find your trove</div>
        <div className={socialHolderCn}>
          <div className={socialMediaPlaceholderCn} />
          <div className={socialMediaPlaceholderCn} />
          <div className={socialMediaPlaceholderCn} />
        </div>
      </div>
      <div>links</div>
      <div>newsletter</div>
    </div>
    <div className={cn(pagePaddingCn, copyrightHolderCn)}>copyrigt</div>
  </footer>
);
