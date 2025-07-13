import type { UseQueryOptions } from '@tanstack/react-query';

import type { ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type MyArticleGetQKey, type MyArticleGetVariables, useMyArticleQuery } from '@entities/articles';

export type MyBlogPostGetVariables = Omit<MyArticleGetVariables, 'type'>;

export const useMyBlogPostQuery = (
  variables: MyBlogPostGetVariables,
  options?: Partial<UseQueryOptions<ArticleGetResponse, FailedResponse, ArticleGetResponse, MyArticleGetQKey>>
) => useMyArticleQuery({ ...variables, type: 'blog_post' }, options);
