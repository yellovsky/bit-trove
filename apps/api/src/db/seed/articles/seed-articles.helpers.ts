// local modules
import type { DBArticleBlockSeedData } from './seed-articles.types';

export const textBlock = (
  text: string,
  options?: { title?: string; subtitle?: string },
): DBArticleBlockSeedData => ({
  content: { text, type: 'html' },
  subtitle: options?.subtitle || null,
  title: options?.title || null,
  type: 'text',
});

export const mdBlock = (
  text: string,
  options?: { title?: string; subtitle?: string },
): DBArticleBlockSeedData => ({
  content: { text, type: 'md' },
  subtitle: options?.subtitle || null,
  title: options?.title || null,
  type: 'text',
});

export const codeBlock = (
  variants: Array<{
    filename?: string;
    label?: string;
    language: string;
    text: string;
  }>,
  options?: { title?: string; subtitle?: string },
): DBArticleBlockSeedData => ({
  content: {
    variants: variants.map((v) => ({ filename: null, label: null, ...v })),
  },
  subtitle: options?.subtitle || null,
  title: options?.title || null,
  type: 'code',
});
