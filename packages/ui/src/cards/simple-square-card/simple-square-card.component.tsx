// global modules
import { Link } from '@bit-trove/ui/link';
import { AspectRatio, Card, CardFooter, Image, Skeleton } from '@chakra-ui/react';
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
  <Card plain as={Link} borderRadius="lg" className={cardHolderCn} overflow="hidden" to={to}>
    <AspectRatio overflow="hidden" ratio={1 / 1}>
      <Image alt="Category cover" className={imgCn} src={cover} />
    </AspectRatio>
    <CardFooter className={cardFooterCn}>{name}</CardFooter>
  </Card>
);

export const SimpleSquareCardPending: FC = () => (
  <Skeleton borderRadius="lg" overflow="hidden">
    <Card>
      <AspectRatio overflow="hidden" ratio={1 / 1}>
        <div />
      </AspectRatio>
      <CardFooter className={cardFooterCn}> &nbsp;</CardFooter>
    </Card>
  </Skeleton>
);
