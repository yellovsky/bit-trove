// global modules
import { AspectRatio } from '@bit-trove/ui/aspect-ratio';
import { Image } from '@bit-trove/ui/image';
import { Link } from '@bit-trove/ui/link';
import { Skeleton } from '@bit-trove/ui/skeleton';
import { Text } from '@bit-trove/ui/text';
import type { ComponentProps, FC } from 'react';

// local modules
import { img as imgCn, plateLink as plateLinkCn, text as textCn } from './plate-link.module.scss';

interface PlateLinkProps extends ComponentProps<typeof Link> {
  image?: string;
}

export const PlateLinkPending: FC = () => <Skeleton borderRadius="sm" ratio={27 / 10} />;

export const PlateLink: FC<PlateLinkProps> = ({ image, ...rest }) => (
  <AspectRatio borderRadius="sm" ratio={27 / 10}>
    <Link {...rest} plain className={plateLinkCn}>
      <Image className={imgCn} src={image} />
      <Text className={textCn} color="white">
        {rest.children}
      </Text>
    </Link>
  </AspectRatio>
);
