import { CommandIcon, SearchIcon, SearchXIcon, XIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { IconButton } from '@repo/ui/components/IconButton';
import { ScrollArea } from '@repo/ui/components/ScrollArea';
import * as TextInput from '@repo/ui/components/TextInput';
import { Kbd } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceRoot
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_ROOT_NAME = 'SearchInterfaceRoot';

interface SearchInterfaceRootProps {
  initialQuery?: string;
  children?: React.ReactNode;
  className?: string;
  onQueryChange?: (query: string, debouncedQuery: string) => void;
}

const SearchInterfaceRoot: FC<SearchInterfaceRootProps> = ({
  initialQuery = '',
  children,
  className,
  onQueryChange,
  ...props
}) => (
  <div
    className={cn(
      'relative w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl',
      className
    )}
    data-slot="search-interface-root"
    {...props}
  >
    {children}
  </div>
);

SearchInterfaceRoot.displayName = SEARCH_INTERFACE_ROOT_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceInput
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_INPUT_NAME = 'SearchInterfaceInput';

type SearchInterfaceInputProps = TextInput.TextInputProps & {
  onClear?: () => void;
};

const SearchInterfaceInput: FC<SearchInterfaceInputProps> = ({ onClear, className, ...props }) => (
  <div className={cn('flex items-center space-x-3 border-border border-b bg-muted/30 p-4', className)}>
    <CommandIcon className="h-5 w-5 text-muted-foreground" />
    <div className="relative flex flex-1 gap-1">
      <TextInput.Root className="flex-1" data-slot="search-interface-input" type="text" {...props}>
        <TextInput.StartSection>
          <SearchIcon />
        </TextInput.StartSection>
      </TextInput.Root>

      <IconButton aria-label="Clear search" onClick={onClear} size="md" type="button" variant="ghost">
        <XIcon className="h-4 w-4 text-muted-foreground" />
      </IconButton>
    </div>
  </div>
);

SearchInterfaceInput.displayName = SEARCH_INTERFACE_INPUT_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceLoading
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_LOADING_NAME = 'SearchInterfaceLoading';

type SearchInterfaceLoadingProps = ComponentProps<'div'>;

const SearchInterfaceLoading: FC<SearchInterfaceLoadingProps> = ({ className, children, ...rest }) => (
  <div
    aria-live="polite"
    className={cn('flex items-center justify-center py-6', className)}
    data-slot="search-interface-loading"
    {...rest}
  >
    <div className="h-6 w-6 animate-spin rounded-full border-primary border-b-2" />
    <span className="ml-2 text-muted-foreground text-sm">{children}</span>
  </div>
);

SearchInterfaceLoading.displayName = SEARCH_INTERFACE_LOADING_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceError
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_ERROR_NAME = 'SearchInterfaceError';

type SearchInterfaceErrorProps = ComponentProps<'div'> & {
  onRetry?: () => void;
  isRetrying?: boolean;
  retryable?: boolean;
  retryText?: string;
};

const SearchInterfaceError: FC<SearchInterfaceErrorProps> = ({
  onRetry,
  isRetrying = false,
  className,
  retryable = true,
  children,
  retryText,
  ...rest
}) => (
  <div
    {...rest}
    aria-live="assertive"
    className={cn('flex flex-col items-center justify-center px-4 py-6', className)}
    data-slot="search-interface-error"
    id="search-error"
  >
    <div className="mb-2 text-destructive text-sm">{children}</div>
    {retryable && onRetry && (
      <button
        aria-label="Retry search"
        className="rounded text-primary text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isRetrying}
        onClick={onRetry}
        type="button"
      >
        {retryText}
      </button>
    )}
  </div>
);

SearchInterfaceError.displayName = SEARCH_INTERFACE_ERROR_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceEmpty
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_EMPTY_NAME = 'SearchInterfaceEmpty';

type SearchInterfaceEmptyProps = ComponentProps<'div'> & {
  title: string;
  message: string;
  query: string;
  tip: string;
};

const SearchInterfaceEmpty: FC<SearchInterfaceEmptyProps> = ({ title, message, query, tip, className, ...rest }) => (
  <div className={cn('px-6 py-12 text-center text-muted-foreground', className)} {...rest}>
    <SearchXIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
    <h3 className="mb-2 font-medium">{title}</h3>
    <p className="text-sm">
      {message} "<span className="font-mono text-foreground">{query}</span>"
    </p>
    <p className="mt-2 text-xs opacity-75">{tip}</p>
  </div>
);

SearchInterfaceEmpty.displayName = SEARCH_INTERFACE_EMPTY_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceContent
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_CONTENT_NAME = 'SearchInterfaceContent';

type SearchInterfaceContentProps = ComponentProps<'div'>;

const SearchInterfaceContent: FC<SearchInterfaceContentProps> = ({ className, ...rest }) => (
  <ScrollArea className={cn('flex max-h-98 flex-col gap-2 px-4 py-4', className)}>
    <div className="flex flex-col gap-2" {...rest} />
  </ScrollArea>
);

SearchInterfaceContent.displayName = SEARCH_INTERFACE_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfaceViewAll
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_VIEW_ALL_NAME = 'SearchInterfaceViewAll';

interface SearchInterfaceViewAllProps {
  totalCount: number;
  onViewAll: () => void;
  className?: string;
}

const SearchInterfaceViewAll: FC<SearchInterfaceViewAllProps> = ({ totalCount, onViewAll, className }) => (
  <div className={cn('border-t p-2', className)} data-slot="search-interface-view-all">
    <button
      className="w-full rounded-sm px-2 py-1.5 text-left text-muted-foreground text-sm hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none"
      onClick={onViewAll}
      type="button"
    >
      View all {totalCount} results
    </button>
  </div>
);

SearchInterfaceViewAll.displayName = SEARCH_INTERFACE_VIEW_ALL_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchInterfacePrompt
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_INTERFACE_PROMPT_NAME = 'SearchInterfacePrompt';

type SearchInterfacePromptProps = ComponentProps<'div'> & {
  title: string;
  message: string;
  keyMap: Array<{ key: string; description: string }>;
};

const SearchInterfacePrompt: FC<SearchInterfacePromptProps> = ({ title, message, keyMap, className, ...rest }) => (
  <div className={cn('px-6 py-12 text-center text-muted-foreground', className)} {...rest}>
    <SearchIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
    <h3 className="mb-2 font-medium">{title}</h3>
    <p className="text-balance text-sm">{message}</p>
    <div className="mt-4 space-y-1 text-xs">
      <div className="flex items-center justify-center space-x-4">
        {keyMap?.map(({ key, description }) => (
          <span className="flex items-center space-x-1" key={key}>
            <Kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">{key}</Kbd>
            <span>{description}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
);

SearchInterfacePrompt.displayName = SEARCH_INTERFACE_PROMPT_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = SearchInterfaceRoot;
const Input = SearchInterfaceInput;
const Loading = SearchInterfaceLoading;
const ErrorState = SearchInterfaceError;
const Empty = SearchInterfaceEmpty;
const Content = SearchInterfaceContent;
const ViewAll = SearchInterfaceViewAll;
const Prompt = SearchInterfacePrompt;

export {
  Root,
  Input,
  Loading,
  ErrorState,
  Empty,
  Content,
  ViewAll,
  Prompt,
  //
  SearchInterfaceRoot,
  SearchInterfaceInput,
  SearchInterfaceLoading,
  SearchInterfaceError,
  SearchInterfaceEmpty,
  SearchInterfaceContent,
  SearchInterfaceViewAll,
  SearchInterfacePrompt,
};

export type {
  SearchInterfaceRootProps,
  SearchInterfaceInputProps,
  SearchInterfaceLoadingProps,
  SearchInterfaceErrorProps,
  SearchInterfaceEmptyProps,
  SearchInterfaceContentProps,
  SearchInterfaceViewAllProps,
  SearchInterfacePromptProps,
};
