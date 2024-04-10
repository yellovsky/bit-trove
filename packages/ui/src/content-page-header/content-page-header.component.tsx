// global modules
import cn from 'classnames';
import { DarkMode, Heading, HStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import {
  contentPageHeader as contentPageHeaderCn,
  withBackground as withBackgroundCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps extends PropsWithChildren {
  className?: string;

  background?: string;
  topBadges?: ReactNode;
  bottomBadges?: ReactNode;
}

export const ContentPageHeader: FC<ContentPageHeaderProps> = (props) => {
  const topBadges = !props.topBadges ? null : <HStack>{props.topBadges}</HStack>;
  const bottomBadges = !props.bottomBadges ? null : <HStack>{props.bottomBadges}</HStack>;

  const content = (
    <div
      className={cn(props.className, contentPageHeaderCn, props.background && withBackgroundCn)}
      style={{ backgroundImage: `url("${props.background}")` }}
    >
      {topBadges}
      <Heading as="h1" mb="1rem">
        {props.children}
      </Heading>
      {bottomBadges}
    </div>
  );

  return !props.background ? content : <DarkMode>{content}</DarkMode>;
};
