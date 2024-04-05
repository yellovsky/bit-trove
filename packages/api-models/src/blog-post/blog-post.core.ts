export interface BlogpostCore {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views_count: string | null;
  short_description: string | null;
}
