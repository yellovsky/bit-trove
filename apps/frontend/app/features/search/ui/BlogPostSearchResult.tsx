import { FileTextIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortBlogPost } from '@repo/api-models';
import { Link } from '@repo/ui/components/Link';
import * as SearchResultItem from '@repo/ui/components/SearchResultItem';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { getBlogPostLink } from '@features/blog-posts';

/* -------------------------------------------------------------------------------------------------
 * BlogPostSearchResult
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'BlogPostSearchResult';

type BlogPostSearchResultProps = SearchResultItem.SearchResultItemProps & {
  blogPost: ShortBlogPost;
};

const BlogPostSearchResult: FC<BlogPostSearchResultProps> = ({ blogPost, ...rest }) => {
  const { t } = useTranslation();
  const date = useRelativeDate(blogPost.createdAt);

  return (
    <SearchResultItem.Root {...rest} asChild>
      <Link to={getBlogPostLink(blogPost)}>
        <SearchResultItem.Icon>
          <FileTextIcon className="text-green-500" />
        </SearchResultItem.Icon>

        <SearchResultItem.Content>
          <SearchResultItem.Header>
            <span className="text-xs">📝</span>
            <span className="font-mono text-muted-foreground text-xs">blog-post.md</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-secondary-foreground text-xs capitalize">
              Blog Post
            </span>
          </SearchResultItem.Header>

          <SearchResultItem.Title>{blogPost.title}</SearchResultItem.Title>

          {blogPost.shortDescription && (
            <SearchResultItem.Description>{blogPost.shortDescription}</SearchResultItem.Description>
          )}

          <SearchResultItem.Footer>
            <SearchResultItem.Meta>
              {blogPost.author && <SearchResultItem.Author>{blogPost.author.name}</SearchResultItem.Author>}
              <SearchResultItem.DateComponent>{date}</SearchResultItem.DateComponent>
              <SearchResultItem.ReadingTime>
                {t('{{number}} min read', { number: blogPost.readingTime })}
              </SearchResultItem.ReadingTime>
            </SearchResultItem.Meta>
          </SearchResultItem.Footer>

          {blogPost.tags.length > 0 && (
            <SearchResultItem.Tags>
              {blogPost.tags.slice(0, 3).map((tag) => (
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

BlogPostSearchResult.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { BlogPostSearchResult };

export type { BlogPostSearchResultProps };
