// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { TitlePending } from '@bit-trove/ui/title';
import { SmallBadgePending } from '@bit-trove/ui/small-badge';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';

// local modules
import {
  title as titleCn,
  topBadges as topBadgesCn,
  withBackground as withBackgroundCn,
  contentPageHeader as contentPageHeaderCn,
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

    <TitlePending styledAs="h1" className={titleCn} />

    <SmallBadgesHolder>
      <SmallBadgePending />
      <SmallBadgePending />
    </SmallBadgesHolder>
  </div>
);
