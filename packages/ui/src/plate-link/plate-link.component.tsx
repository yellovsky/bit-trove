// global modules
import { AspectRatio } from '@bit-trove/ui/aspect-ratio';
import { Image } from '@bit-trove/ui/image';
import { Link } from '@bit-trove/ui/link';
import { Skeleton } from '@bit-trove/ui/skeleton';
import { Text } from '@bit-trove/ui/text';
import { ThemeProvider } from '@bit-trove/ui/theme-provider';
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
