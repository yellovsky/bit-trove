// global modules
import { Box } from '@bit-trove/ui/box';
import cn from 'classnames';
import { Divider } from '@bit-trove/ui/divider';
import { Heading } from '@bit-trove/ui/heading';
import { Stack } from '@bit-trove/ui/stack';
import { ThemeProvider } from '@bit-trove/ui/theme-provider';
import type { FC, PropsWithChildren, ReactNode } from 'react';

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
  const topBadges = !props.topBadges ? null : (
    <Stack mb="1rem" orientation="horizontal">
      {props.topBadges}
    </Stack>
  );
  const bottomBadges = !props.bottomBadges ? null : (
    <Stack orientation="horizontal">{props.bottomBadges}</Stack>
  );

  const content = (
    <>
      <Box
        className={cn(props.className, contentPageHeaderCn, props.background && withBackgroundCn)}
        mb={props.background ? '2rem' : '3rem'}
        mt="3rem"
        style={{ backgroundImage: `url("${props.background}")` }}
      >
        {topBadges}
        <Heading as="h1" mb="1rem" size="xl">
          {props.children}
        </Heading>
        {bottomBadges}
      </Box>
      <Box className={pagePaddingCn}>{props.background ? null : <Divider mb="3rem" />}</Box>
    </>
  );

  return !props.background ? content : <ThemeProvider colorMode="dark">{content}</ThemeProvider>;
};
