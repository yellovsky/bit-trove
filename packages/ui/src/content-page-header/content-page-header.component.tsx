// global modules
import cn from 'classnames';
import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
import { Title } from '@bit-trove/ui/title';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import { ThemeProvider } from '../theme-provider';

import {
  contentPageHeader as contentPageHeaderCn,
  title as titleCn,
  topBadges as topBadgesCn,
  withBackground as withBackgroundCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps extends PropsWithChildren {
  className?: string;

  background?: string;
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

  const content = (
    <div
      className={cn(props.className, contentPageHeaderCn, props.background && withBackgroundCn)}
      style={{ backgroundImage: `url("${props.background}")` }}
    >
      {topBadges}
      <Title as="h1" className={titleCn}>
        {props.children}
      </Title>
      {bottomBadges}
    </div>
  );

  return !props.background ? (
    content
  ) : (
    <ThemeProvider dark withoutBackground>
      {content}
    </ThemeProvider>
  );
};
