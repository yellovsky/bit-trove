// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import { Skeleton } from '@repo/ui/skeleton';
// import { SmallBadgePending } from '@repo/ui/small-badge';
import { Box } from '@repo/ui/box';
import { Divider } from '@repo/ui/divider';
import { Heading } from '@repo/ui/heading';
import { Stack } from '@repo/ui/stack';

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
      className={clsx(
        props.className,
        contentPageHeaderCn,
        props.withBackground && withBackgroundCn
      )}
      mb={props.withBackground ? '2rem' : '3rem'}
      mt="3rem"
    >
      <Stack mb="1rem">
        {/* <SmallBadgePending />
        <SmallBadgePending /> */}
      </Stack>

      <Skeleton mb="1rem">
        <Heading as="h1">&nbsp;</Heading>
      </Skeleton>

      <Stack>
        {/* <SmallBadgePending />
        <SmallBadgePending /> */}
      </Stack>
    </Box>
    <Box className={pagePaddingCn}>
      {props.withBackground ? null : <Divider borderColor="gray.400" mb="3rem" />}
    </Box>
  </>
);
