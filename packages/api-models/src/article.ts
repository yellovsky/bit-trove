export interface ArticleBaseBlock<TType extends string, TContent extends object> {
  type: TType;
  title: string | null;
  subtitle: string | null;
  content: TContent;
}

export type ArticleImageBlock = ArticleBaseBlock<'image', { url: string }>;
export type ArticleTextBlock = ArticleBaseBlock<'text', { type: 'html' | 'md'; text: string }>;

export interface CodeBlockVariant {
  filename: string | null;
  language: string;
  label: string | null;
  text: string;
}

export type ArticleCodeBlock = ArticleBaseBlock<'code', { variants: CodeBlockVariant[] }>;

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock;
