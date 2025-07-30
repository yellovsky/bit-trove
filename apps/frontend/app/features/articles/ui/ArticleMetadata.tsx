import type { FC } from 'react';

import { Badge } from '@repo/ui/components/Badge';
import { cn } from '@repo/ui/lib/utils';

import { DateLabelIcon, ReadingTimeLabelIcon } from '@shared/ui/LabeledIcon';

/* -------------------------------------------------------------------------------------------------
 * ArticleMetadata
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ArticleMetadata';

type ArticleMetadataProps = {
  tags?: Array<{ id: string; name: string; slug: string }>;
  publishedAt?: string | null;
  readingTime?: number;
  className?: string;
};

const ArticleMetadata: FC<ArticleMetadataProps> = ({ tags, publishedAt, readingTime, className }) => (
  <div className={cn('space-y-4', className)}>
    {/* Author and date information */}
    <div className="flex items-center gap-4 text-muted-foreground text-sm">
      {publishedAt && <DateLabelIcon date={publishedAt} />}
      {readingTime && <ReadingTimeLabelIcon minutes={readingTime} />}
    </div>

    {/* Tags */}
    {!!tags?.length && (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">Tags:</span>
        {tags.map((tag) => (
          <Badge className="text-xs" key={tag.id} variant="soft">
            {tag.name}
          </Badge>
        ))}
      </div>
    )}
  </div>
);

ArticleMetadata.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ArticleMetadata };

export type { ArticleMetadataProps };
