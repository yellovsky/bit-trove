// global modules
import cn from 'classnames';
import type { FC } from 'react';
import { SmallBadgePending } from '@bit-trove/ui/small-badge';
import { Box, Divider, Heading, HStack, Skeleton } from '@chakra-ui/react';

// local modules
import {
  contentPageHeader as contentPageHeaderCn,
  pagePadding as pagePaddingCn,
  withBackground as withBackgroundCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps {
  className?: string;
  withBackground?: boolean;
}

export const ContentPageHeaderPending: FC<ContentPageHeaderProps> = (props) => (
  <>
    <Box
      className={cn(props.className, contentPageHeaderCn, props.withBackground && withBackgroundCn)}
      mb={props.withBackground ? '2rem' : '3rem'}
      mt="3rem"
    >
      <HStack mb="1rem">
        <SmallBadgePending />
        <SmallBadgePending />
      </HStack>

      <Skeleton mb="1rem">
        <Heading as="h1">&nbsp;</Heading>
      </Skeleton>

      <HStack>
        <SmallBadgePending />
        <SmallBadgePending />
      </HStack>
    </Box>
    <Box className={pagePaddingCn}>
      {props.withBackground ? null : <Divider borderColor="gray.400" mb="3rem" />}
    </Box>
  </>
);
