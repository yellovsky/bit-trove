// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { SmallBadgePending } from '@bit-trove/ui/small-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { TitlePending } from '@bit-trove/ui/title';

// local modules
import {
  contentPageHeader as contentPageHeaderCn,
  title as titleCn,
  topBadges as topBadgesCn,
  withBackground as withBackgroundCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps {
  className?: string;

  withBackground?: boolean;
}

export const ContentPageHeaderPending: FC<ContentPageHeaderProps> = (props) => (
  <div
    className={cn(props.className, contentPageHeaderCn, props.withBackground && withBackgroundCn)}
  >
    <SmallBadgesHolder className={topBadgesCn}>
      <SmallBadgePending />
      <SmallBadgePending />
    </SmallBadgesHolder>

    <TitlePending className={titleCn} styledAs="h1" />

    <SmallBadgesHolder>
      <SmallBadgePending />
      <SmallBadgePending />
    </SmallBadgesHolder>
  </div>
);
