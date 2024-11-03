import type { ItemResponse } from './response';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
}

export type BlogPostResponse = ItemResponse<BlogPost>;
