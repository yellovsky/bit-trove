// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import {
  baseSlide as baseSlideCn,
  date as dateCn,
  description as descriptionCn,
  pending as pendingCn,
  slide as slideCn,
  title as titleCn,
} from './guide-slide.module.scss';

interface GuideSlidePendingProps {
  className?: string;
}

export const GuideSlidePending: FC<GuideSlidePendingProps> = props => (
  <div className={clsx(props.className, slideCn, baseSlideCn, pendingCn)}>
    <div>
      <div className={titleCn} />
      <div className={dateCn} />
    </div>

    <div className={descriptionCn} />
  </div>
);
