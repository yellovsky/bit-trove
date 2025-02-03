export interface ArticleBaseBlock<TType extends string, TContent extends object> {
  type: TType;
  order: number;
  title: string | null;
  subtitle: string | null;
  content: TContent;
}

export type ArticleImageBlock = ArticleBaseBlock<'image', { url: string }>;
export type ArticleTextBlock = ArticleBaseBlock<'text', { html: string } | { md: string }>;

export type ArticleCodeBlock = ArticleBaseBlock<
  'code',
  { variants: Array<{ language: string; text: string }> }
>;

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock | ArticleCodeBlock;
