// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SmallBadgesHolder } from '@repo/ui/small-badges-holder';

// local modules
import {
  title as titleCn,
  holder as holderCn,
  topBadges as topBadgesCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps extends PropsWithChildren {
  className?: string;

  topBadges?: ReactNode;
  bottomBadges?: ReactNode;
}

export const ContentPageHeader: FC<ContentPageHeaderProps> = (props) => {
  const topBadges = !props.topBadges ? null : (
    <SmallBadgesHolder className={topBadgesCn}>{props.topBadges}</SmallBadgesHolder>
  );

  const bottomBadges = !props.bottomBadges ? null : (
    <SmallBadgesHolder>{props.bottomBadges}</SmallBadgesHolder>
  );

  return (
    <div className={cn(props.className, holderCn)}>
      {topBadges}
      <h1 className={titleCn}>{props.children}</h1>
      {bottomBadges}
    </div>
  );
};
