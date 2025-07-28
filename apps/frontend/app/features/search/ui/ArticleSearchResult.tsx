import { FileTextIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { isBlogPost, isShard, type ShortArticle } from '@repo/api-models';
import { Link } from '@repo/ui/components/Link';
import * as SearchResultItem from '@repo/ui/components/SearchResultItem';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { getBlogPostLink } from '@features/blog-posts';
import { getShardLink } from '@features/shards';

import { makeArticleFilename } from '@entities/articles';

/* -------------------------------------------------------------------------------------------------
 * ArticleSearchResult
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ArticleSearchResult';

type ArticleSearchResultProps = SearchResultItem.SearchResultItemProps & {
  article: ShortArticle;
};

const ArticleSearchResult: FC<ArticleSearchResultProps> = ({ article, ...rest }) => {
  const { t } = useTranslation();
  const date = useRelativeDate(article.createdAt);

  const to = isBlogPost(article) ? getBlogPostLink(article) : isShard(article) ? getShardLink(article) : '/';
  const filename = makeArticleFilename(article.title);

  return (
    <SearchResultItem.Root {...rest} asChild>
      <Link to={to}>
        <SearchResultItem.Icon>
          <FileTextIcon className="text-green-500" />
        </SearchResultItem.Icon>

        <SearchResultItem.Content>
          <SearchResultItem.Header>
            <span className="text-xs">📝</span>
            <span className="font-mono text-muted-foreground text-xs">{filename}</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
              {isBlogPost(article) ? t('Blog Post') : t('Shard')}
            </span>
          </SearchResultItem.Header>

          <SearchResultItem.Title>{article.title}</SearchResultItem.Title>

          {article.shortDescription && (
            <SearchResultItem.Description>{article.shortDescription}</SearchResultItem.Description>
          )}

          <SearchResultItem.Footer>
            <SearchResultItem.Meta>
              {article.author && <SearchResultItem.Author>{article.author.name}</SearchResultItem.Author>}
              <SearchResultItem.DateComponent>{date}</SearchResultItem.DateComponent>
              <SearchResultItem.ReadingTime>
                {t('{{number}} min read', { number: article.readingTime })}
              </SearchResultItem.ReadingTime>
            </SearchResultItem.Meta>
          </SearchResultItem.Footer>

          {article.tags.length > 0 && (
            <SearchResultItem.Tags>
              {article.tags.slice(0, 3).map((tag) => (
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

ArticleSearchResult.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ArticleSearchResult };

export type { ArticleSearchResultProps };
