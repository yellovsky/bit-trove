import { type ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as Dialog from '@repo/ui/components/Dialog';
import * as SearchInterface from '@repo/ui/components/SearchInterface';

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

export const SearchCommand = ({ open, onOpenChange, initialQuery = '' }: SearchCommandProps) => {
  const [query, setQuery] = useState(initialQuery);
  const { i18n, t } = useTranslation();

  return null;
  // const articlesQuery = useInfiniteArticlesQuery(
  //   { locale: i18n.language, search: query, sort: '-createdAt' },
  //   { enabled: open && query.length >= 3 }
  // );

  // const articles = articlesQuery.data?.pages.flatMap((page) => page.data.items) ?? [];

  // const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setQuery(e.target.value);
  // };

  // const handleRetry = () => {
  //   if (query.length >= 3) {
  //     articlesQuery.refetch();
  //   }
  // };

  // const isLoading = articlesQuery.isLoading;
  // const hasError = articlesQuery.error;
  // const totalResults = articles.length;

  // return (
  //   <Dialog.Root onOpenChange={onOpenChange} open={open}>
  //     <Dialog.Content className="top-16 translate-y-0 border-none p-0" showCloseButton={false}>
  //       <SearchInterface.Root>
  //         <SearchInterface.Input onChange={handleInputChange} placeholder={t('search.placeholder')} value={query} />

  //         {isLoading && <SearchInterface.Loading>{t('search.searching')}</SearchInterface.Loading>}

  //         {!!hasError && (
  //           <SearchInterface.ErrorState
  //             isRetrying={isLoading}
  //             onRetry={handleRetry}
  //             retryable={hasError?.error?.httpCode === 400}
  //           >
  //             {hasError?.error?.message || 'An error occurred while searching'}
  //           </SearchInterface.ErrorState>
  //         )}

  //         {!isLoading && !hasError && query.length >= 3 && totalResults === 0 && (
  //           <SearchInterface.Empty
  //             message={t('search.empty_message')}
  //             query={query}
  //             tip={t('search.empty_tip')}
  //             title={t('search.empty_title')}
  //           />
  //         )}

  //         {!isLoading && !hasError && query.length >= 3 && totalResults > 0 && (
  //           <SearchInterface.Content>
  //             {/* Articles Section */}
  //             {articles.length > 0 && (
  //               <>
  //                 <div className="mb-2 px-2 py-1 font-medium text-muted-foreground text-xs">
  //                   Articles ({articles.length})
  //                 </div>
  //                 {articles.map((article) => (
  //                   <ArticleSearchResult article={article} key={article.id} />
  //                 ))}
  //               </>
  //             )}
  //           </SearchInterface.Content>
  //         )}

  //         {!isLoading && !hasError && query.length < 3 && (
  //           <SearchInterface.Prompt
  //             keyMap={[
  //               { description: t('search.search_navigation'), key: '↑↓' },
  //               { description: t('search.search_select'), key: 'Enter' },
  //               { description: t('search.search_close'), key: 'Esc' },
  //             ]}
  //             message={t('search.prompt_message')}
  //             title={t('search.prompt_title')}
  //           />
  //         )}
  //       </SearchInterface.Root>
  //     </Dialog.Content>
  //   </Dialog.Root>
  // );
};
