// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import type { To } from 'history';
import { useTranslation } from 'react-i18next';

// common modules
import { Link } from '~/components/link';

// local modules

import { baseSlide as baseSlideCn, seeAllSlide as seeAllSlideCn } from './guide-slide.module.scss';

interface GuideSeeAllSlideProps {
  className?: string;
  to: To;
}

export const GuideSeeAllSlide: FC<GuideSeeAllSlideProps> = props => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx(props.className, seeAllSlideCn, baseSlideCn)}
      to={props.to}
      variant="standalone"
    >
      {t('SEE_ALL_GUIDES')}
    </Link>
  );
};
