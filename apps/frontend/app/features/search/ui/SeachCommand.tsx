import { type ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as Dialog from '@repo/ui/components/Dialog';
import * as SearchInterface from '@repo/ui/components/SearchInterface';

import { useInfiniteBlogPostsQuery } from '@entities/blog-posts';
import { useInfiniteShardsQuery } from '@entities/shards';

import { BlogPostSearchResult } from './BlogPostSearchResult';
import { ShardSearchResult } from './ShardSearchResult';

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

export const SearchCommand = ({ open, onOpenChange, initialQuery = '' }: SearchCommandProps) => {
  const [query, setQuery] = useState(initialQuery);
  const { i18n, t } = useTranslation();

  const blogPostsQuery = useInfiniteBlogPostsQuery(
    { locale: i18n.language, search: query, sort: '-createdAt' },
    { enabled: open && query.length >= 3 }
  );

  const shardsQuery = useInfiniteShardsQuery(
    { locale: i18n.language, search: query, sort: '-createdAt' },
    { enabled: open && query.length >= 3 }
  );

  const blogPosts = blogPostsQuery.data?.pages.flatMap((page) => page.data).flatMap((p) => p.items) ?? [];
  const shards = shardsQuery.data?.pages.flatMap((page) => page.data).flatMap((p) => p.items) ?? [];

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const handleRetry = () => {
    if (query.length >= 3) {
      blogPostsQuery.refetch();
      shardsQuery.refetch();
    }
  };

  const isLoading = blogPostsQuery.isLoading || shardsQuery.isLoading;
  const hasError = blogPostsQuery.error || shardsQuery.error;
  const totalResults = blogPosts.length + shards.length;

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Content className="top-16 translate-y-0 border-none p-0" showCloseButton={false}>
        <SearchInterface.Root>
          <SearchInterface.Input onChange={handleInputChange} placeholder={t('search.placeholder')} value={query} />

          {isLoading && <SearchInterface.Loading>{t('search.searching')}</SearchInterface.Loading>}

          {!!hasError && (
            <SearchInterface.ErrorState
              isRetrying={isLoading}
              onRetry={handleRetry}
              retryable={hasError?.error?.httpCode === 400}
            >
              {hasError?.error?.message || 'An error occurred while searching'}
            </SearchInterface.ErrorState>
          )}

          {!isLoading && !hasError && query.length >= 3 && totalResults === 0 && (
            <SearchInterface.Empty
              message={t('search.empty_message')}
              query={query}
              tip={t('search.empty_tip')}
              title={t('search.empty_title')}
            />
          )}

          {!isLoading && !hasError && query.length >= 3 && totalResults > 0 && (
            <SearchInterface.Content>
              {/* Blog Posts Section */}
              {blogPosts.length > 0 && (
                <>
                  <div className="mb-2 px-2 py-1 font-medium text-muted-foreground text-xs">
                    Blog Posts ({blogPosts.length})
                  </div>
                  {blogPosts.map((blogPost) => (
                    <BlogPostSearchResult blogPost={blogPost} key={blogPost.id} />
                  ))}
                </>
              )}

              {/* Shards Section */}
              {shards.length > 0 && (
                <>
                  <div className="mb-2 px-2 py-1 font-medium text-muted-foreground text-xs">
                    Shards ({shards.length})
                  </div>
                  {shards.map((shard) => (
                    <ShardSearchResult key={shard.id} shard={shard} />
                  ))}
                </>
              )}
            </SearchInterface.Content>
          )}

          {!isLoading && !hasError && query.length < 3 && (
            <SearchInterface.Prompt
              keyMap={[
                { description: t('search.search_navigation'), key: '↑↓' },
                { description: t('search.search_select'), key: 'Enter' },
                { description: t('search.search_close'), key: 'Esc' },
              ]}
              message={t('search.prompt_message')}
              title={t('search.prompt_title')}
            />
          )}
        </SearchInterface.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
