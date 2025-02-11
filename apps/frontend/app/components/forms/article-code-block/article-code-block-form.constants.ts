// global modules
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';

export const DEFAULT_CODE_BLOCK_VARIANT: CodeBlockVariant = {
  filename: null,
  label: null,
  language: '',
  text: '',
} as const;

export const DEFAULT_CODE_BLOCK: ArticleCodeBlock = {
  content: { variants: [] },
  order: 0,
  subtitle: null,
  title: null,
  type: 'code',
} as const;
