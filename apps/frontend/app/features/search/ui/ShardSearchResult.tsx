import { NewspaperIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import { Link } from '@repo/ui/components/Link';
import * as SearchResultItem from '@repo/ui/components/SearchResultItem';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { getShardLink } from '@features/shards';

/* -------------------------------------------------------------------------------------------------
 * ShardSearchResult
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ShardSearchResult';

type ShardSearchResultProps = SearchResultItem.SearchResultItemProps & {
  shard: ShortShard;
};

const ShardSearchResult: FC<ShardSearchResultProps> = ({ shard, ...rest }) => {
  const { t } = useTranslation();
  const date = useRelativeDate(shard.createdAt);

  return (
    <SearchResultItem.Root {...rest} asChild>
      <Link to={getShardLink(shard)}>
        <SearchResultItem.Icon>
          <NewspaperIcon className="text-blue-500" />
        </SearchResultItem.Icon>

        <SearchResultItem.Content>
          <SearchResultItem.Header>
            <span className="text-xs">💡</span>
            <span className="font-mono text-muted-foreground text-xs">typescript-best-practices.md</span>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
              Shard
            </span>
          </SearchResultItem.Header>

          <SearchResultItem.Title>{shard.title}</SearchResultItem.Title>

          {shard.shortDescription && (
            <SearchResultItem.Description>{shard.shortDescription}</SearchResultItem.Description>
          )}

          <SearchResultItem.Footer>
            <SearchResultItem.Meta>
              {shard.author && <SearchResultItem.Author>{shard.author.name}</SearchResultItem.Author>}
              <SearchResultItem.DateComponent>{date}</SearchResultItem.DateComponent>
              <SearchResultItem.ReadingTime>
                {t('{{number}} min read', { number: shard.readingTime })}
              </SearchResultItem.ReadingTime>
            </SearchResultItem.Meta>
          </SearchResultItem.Footer>

          {shard.tags.length > 0 && (
            <SearchResultItem.Tags>
              {shard.tags.slice(0, 3).map((tag) => (
                <SearchResultItem.Tag key={tag.id}>{tag.name}</SearchResultItem.Tag>
              ))}
            </SearchResultItem.Tags>
          )}
        </SearchResultItem.Content>
        <SearchResultItem.Arrow />
      </Link>
    </SearchResultItem.Root>
  );
};

ShardSearchResult.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShardSearchResult };

export type { ShardSearchResultProps };
