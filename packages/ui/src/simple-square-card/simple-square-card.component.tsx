// global modules
import { AspectRatio } from '@bit-trove/ui/aspect-ratio';
import { Image } from '@bit-trove/ui/image';
import { Link } from '@bit-trove/ui/link';
import { Skeleton } from '@bit-trove/ui/skeleton';
import type { ComponentProps, FC, ReactNode } from 'react';

// local modules
import {
  cardFooter as cardFooterCn,
  cardHolder as cardHolderCn,
  img as imgCn,
} from './simple-square-card.module.scss';

interface SimpleSquareCardProps {
  name: ReactNode;
  to: ComponentProps<typeof Link>['to'];
  cover: string | undefined;
}

export const SimpleSquareCard: FC<SimpleSquareCardProps> = ({ to, cover, name }) => (
  <Link className={cardHolderCn} to={to} variant="plain">
    <AspectRatio ratio={1 / 1}>
      <Image alt="Category cover" className={imgCn} src={cover} />
    </AspectRatio>
    <div className={cardFooterCn}>{name}</div>
  </Link>
);

export const SimpleSquareCardPending: FC = () => (
  <Skeleton borderRadius="lg">
    <div className={cardHolderCn}>
      <AspectRatio ratio={1 / 1}>
        <div />
      </AspectRatio>
      <div className={cardFooterCn}>&nbsp;</div>
    </div>
  </Skeleton>
);
