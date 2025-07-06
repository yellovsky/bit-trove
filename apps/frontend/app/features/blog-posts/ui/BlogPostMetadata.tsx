import type { FC } from 'react';

import { Badge } from '@repo/ui/components/Badge';

import { AuthorLabelIcon, DateLabelIcon, ReadingTimeLabelIcon } from '@shared/ui/LabeledIcon';

interface BlogPostMetadataProps {
  author?: {
    name: string;
  } | null;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  publishedAt?: string | null;
  readingTime?: number;
  className?: string;
}

export const BlogPostMetadata: FC<BlogPostMetadataProps> = ({
  author,
  tags = [],
  publishedAt,
  readingTime,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Author and date information */}
      <div className="flex items-center gap-4 text-muted-foreground text-sm">
        {author && <AuthorLabelIcon author={author.name} />}
        {publishedAt && <DateLabelIcon date={publishedAt} />}
        {readingTime && <ReadingTimeLabelIcon minutes={readingTime} />}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm">Tags:</span>
          {tags.map((tag) => (
            <Badge className="text-xs" key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
