// global modules
import { Link } from '@bit-trove/ui/link';
import { AspectRatio, Image, Skeleton, Text } from '@chakra-ui/react';
import type { ComponentProps, FC } from 'react';

// local modules
import { img as imgCn, plateLink as plateLinkCn, text as textCn } from './plate-link.module.scss';

interface PlateLinkProps extends ComponentProps<typeof Link> {
  image?: string;
}

export const PlateLink: FC<PlateLinkProps> = ({ image, ...rest }) => (
  <AspectRatio borderRadius="sm" overflow="hidden" ratio={27 / 10}>
    <Link {...rest} plain className={plateLinkCn}>
      <Image className={imgCn} src={image} />
      <Text className={textCn} color="white">
        {rest.children}
      </Text>
    </Link>
  </AspectRatio>
);

export const PlateLinkPending: FC = () => <Skeleton aspectRatio={27 / 10} borderRadius="sm" />;
