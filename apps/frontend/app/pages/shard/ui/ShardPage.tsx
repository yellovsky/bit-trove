import { ArrowLeftIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { FailedResponse, Shard } from '@repo/api-models';

import { ErrorScreen } from '@shared/ui/ErrorScreen';
import { ReadingProgress } from '@shared/ui/ReadingProgress';

import { ArticlePageContent } from '@features/articles';
import { ArticlePageContentLoading, type ArticlePageContentProps } from '@features/articles/ui/ArticlePageContent';
import type { AppBreadcrumb } from '@features/breadcrumbs';
import { getShardsLink, SHARDS_NS } from '@features/shards';

import { type ShardGetVariables, useShardQuery } from '@entities/shards';

/* -------------------------------------------------------------------------------------------------
 * ShardPageNotFound
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_NOT_FOUND_NAME = 'ShardPageNotFound';

const ShardPageNotFound: FC = () => {
  const { t } = useTranslation();
  const { t: tShards } = useTranslation(SHARDS_NS);

  return (
    <>
      <ReadingProgress />
      <ErrorScreen
        button={
          <Link to={getShardsLink()}>
            <ArrowLeftIcon />
            <span>{tShards('Back to shards')}</span>
          </Link>
        }
        code={404}
        subtitle={t('error_page.404.subtitle')}
        title={t('error_page.404.title')}
      />
    </>
  );
};

ShardPageNotFound.displayName = SHARD_PAGE_NOT_FOUND_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardPageError
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_ERROR_NAME = 'ShardPageError';

type ShardPageErrorStateProps = {
  error?: FailedResponse;
};

const ShardPageErrorState: FC<ShardPageErrorStateProps> = ({ error }) => {
  const { t } = useTranslation();

  if (error?.error?.httpCode === 404) return <ShardPageNotFound />;

  return (
    <>
      <ReadingProgress />
      <ErrorScreen code={500} subtitle={t('error_page.500.subtitle')} title={t('error_page.500.title')} />
    </>
  );
};

ShardPageErrorState.displayName = SHARD_PAGE_ERROR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardPageLoading
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_LOADING_NAME = 'ShardPageLoading';

const ShardPageLoading: FC = (props) => <ArticlePageContentLoading {...props} />;

ShardPageLoading.displayName = SHARD_PAGE_LOADING_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardPageContent
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_CONTENT_NAME = 'ShardPageContent';

type ShardPageContentProps = ArticlePageContentProps;

const ShardPageContent: FC<ShardPageContentProps> = (props) => <ArticlePageContent {...props} />;

ShardPageContent.displayName = SHARD_PAGE_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardPageView
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_VIEW_NAME = 'ShardPageView';

interface ShardPageViewProps {
  shard: Shard | null | undefined;
  breadcrumbs: AppBreadcrumb[];
  error: FailedResponse | null | undefined;
  pending: boolean;
}

const ShardPageView: FC<ShardPageViewProps> = ({ shard, breadcrumbs, error, pending }) => {
  if (pending) return <ShardPageLoading />;
  if (error) return <ShardPageErrorState error={error} />;
  if (!shard) return <ShardPageNotFound />;
  return <ShardPageContent article={shard} breadcrumbs={breadcrumbs} />;
};

ShardPageView.displayName = SHARD_PAGE_VIEW_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardPage
 * -----------------------------------------------------------------------------------------------*/
const SHARD_PAGE_NAME = 'ShardPage';

interface ShardPageProps {
  shardVariables: ShardGetVariables;
  breadcrumbs: AppBreadcrumb[];
}

const ShardPage: FC<ShardPageProps> = ({ shardVariables, breadcrumbs }) => {
  const shardResponse = useShardQuery(shardVariables);

  return (
    <ShardPageView
      breadcrumbs={breadcrumbs}
      error={shardResponse.error}
      pending={shardResponse.isPending}
      shard={shardResponse.data?.data}
    />
  );
};

ShardPage.displayName = SHARD_PAGE_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = ShardPage;
const Content = ShardPageContent;
const Loading = ShardPageLoading;
const ErrorState = ShardPageErrorState;
const View = ShardPageView;
const NotFound = ShardPageNotFound;

export {
  Root,
  Content,
  Loading,
  ErrorState,
  View,
  NotFound,
  //
  ShardPage,
  ShardPageContent,
  ShardPageLoading,
  ShardPageErrorState,
  ShardPageView,
  ShardPageNotFound,
};

export type { ShardPageProps, ShardPageContentProps, ShardPageViewProps };
