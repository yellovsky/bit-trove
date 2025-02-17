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

export interface CMSArticleTranslations {
  language_code: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  blocks: ArticleBlock[];
  title: string;
  short_description: string;
}

export interface CMSArticle {
  original_language_code: string;
  translations: CMSArticleTranslations[];
}
