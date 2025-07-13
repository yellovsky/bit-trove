import type { UseQueryOptions } from '@tanstack/react-query';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type MyArticleGetQKey, type MyArticleGetVariables, useMyArticleQuery } from '@entities/articles';

export type MyShardGetVariables = Omit<MyArticleGetVariables, 'type'>;

export const useMyShardQuery = (
  variables: MyShardGetVariables,
  options?: Partial<UseQueryOptions<ArticleGetResponse, FailedResponse, ArticleGetResponse, MyArticleGetQKey>>
) => useMyArticleQuery({ ...variables, type: 'shard' }, options);
