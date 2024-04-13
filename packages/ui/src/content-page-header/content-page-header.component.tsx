// global modules
import cn from 'classnames';
import { Box, DarkMode, Divider, HStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Heading } from '@bit-trove/ui/heading';

// local modules
import {
  contentPageHeader as contentPageHeaderCn,
  pagePadding as pagePaddingCn,
  withBackground as withBackgroundCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps extends PropsWithChildren {
  className?: string;

  background?: string;
  topBadges?: ReactNode;
  bottomBadges?: ReactNode;
}

export const ContentPageHeader: FC<ContentPageHeaderProps> = (props) => {
  const topBadges = !props.topBadges ? null : <HStack mb="1rem">{props.topBadges}</HStack>;
  const bottomBadges = !props.bottomBadges ? null : <HStack>{props.bottomBadges}</HStack>;

  const content = (
    <>
      <Box
        className={cn(props.className, contentPageHeaderCn, props.background && withBackgroundCn)}
        mb={props.background ? '2rem' : '3rem'}
        mt="3rem"
        style={{ backgroundImage: `url("${props.background}")` }}
      >
        {topBadges}
        <Heading as="h1" mb="1rem">
          {props.children}
        </Heading>
        {bottomBadges}
      </Box>
      <Box className={pagePaddingCn}>
        {props.background ? null : <Divider borderColor="gray.400" mb="3rem" />}
      </Box>
    </>
  );

  return !props.background ? content : <DarkMode>{content}</DarkMode>;
};
