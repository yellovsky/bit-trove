// global modules
import type { ArticleBlock } from '@repo/api-models';
import type { FC } from 'react';

// common modules
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { slugify } from '~/utils/slugify';

// local modules
import { withLinkIcon as withLinkIconCn } from './block-title.module.scss';

interface BlockTitleProps {
  className?: string;
  block: ArticleBlock;
}

export const BlockTitle: FC<BlockTitleProps> = ({ block, className }) => {
  const hash = block.title ? slugify(block.title) : undefined;

  return !block.title ? null : (
    <Heading as="h2" className={className} id={hash} size="md">
      <Link
        className={withLinkIconCn}
        dangerouslySetInnerHTML={{ __html: block.title }}
        to={{ hash }}
        variant="standalone"
      />
    </Heading>
  );
};

export const BlockSubtitle: FC<BlockTitleProps> = ({ block, className }) => {
  const hash = block.subtitle ? slugify(block.subtitle) : undefined;

  return !block.subtitle ? null : (
    <Heading as="h3" className={className} id={hash} size="sm">
      <Link className={withLinkIconCn} to={{ hash }} variant="standalone">
        <span dangerouslySetInnerHTML={{ __html: block.subtitle }} />
      </Link>
    </Heading>
  );
};
