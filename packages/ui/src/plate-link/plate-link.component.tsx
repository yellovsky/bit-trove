// global modules
import { AspectRatio } from '@repo/ui/aspect-ratio';
import { Image } from '@repo/ui/image';
import { Link } from '@repo/ui/link';
import { Skeleton } from '@repo/ui/skeleton';
import { Text } from '@repo/ui/text';
import { ThemeProvider } from '@repo/ui/theme-provider';
import type { ComponentProps, FC } from 'react';

// local modules
import { img as imgCn, plateLink as plateLinkCn, text as textCn } from './plate-link.module.scss';

interface PlateLinkProps extends Omit<ComponentProps<typeof Link>, 'variant'> {
  image?: string;
}

export const PlateLink: FC<PlateLinkProps> = ({ image, ...rest }) => (
  <AspectRatio borderRadius="sm" ratio={27 / 10}>
    <Link {...rest} className={plateLinkCn} variant="plain">
      <Image className={imgCn} src={image} />
      <ThemeProvider colorMode="dark">
        <Text className={textCn}>{rest.children}</Text>
      </ThemeProvider>
    </Link>
  </AspectRatio>
);

export const PlateLinkPending: FC = () => <Skeleton borderRadius="sm" ratio={27 / 10} />;
