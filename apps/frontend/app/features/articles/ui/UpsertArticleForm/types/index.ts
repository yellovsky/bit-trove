import type { Editor as TiptapEditor } from '@tiptap/react';
import type { Control } from 'react-hook-form';

import type { Article, ArticleUpsertBody } from '@repo/api-models';

export type UpsertArticleVariables = Omit<ArticleUpsertBody, 'type'>;

export interface ControlProps {
  control: Control<UpsertArticleVariables>;
}

export interface CreateArticleFormProps {
  isLoading?: boolean;
  onSubmit: (data: UpsertArticleVariables) => Promise<Article>;
  onSuccess?: (data: Article) => void;
  defaultValues?: UpsertArticleVariables;
  mode: 'create' | 'update';
  id?: string;
}

export interface ContentControllerProps extends ControlProps {
  editor: TiptapEditor | null;
}
