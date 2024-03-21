// global modules
import { gql } from '@apollo/client';
import type { TagEntityFragment } from '@repo/api-models/tag';
import type { ImageEntityFragment } from '@repo/api-models/image';
import type { SeoFragment } from '@repo/api-models/seo';
import type { RichTextBlockragment } from './block';
import type { PatrialCategoryFragment } from './category';

export type BlogPostEntityFragment = {
  id: string;
  attributes: {
    title: string;
    slug: string;
    seo: SeoFragment;
    views_count: number;
    tags: { data: TagEntityFragment[] };
    cover: { data: ImageEntityFragment | null };
    blocks: RichTextBlockragment[];
    categories: { data: PatrialCategoryFragment[] };
  };
};

export const BLOG_POST_ENTITY_FRAGMENT = gql`
  fragment BlogPostEntityFragment on BlogpostEntity {
    id
    attributes {
      title
      slug
      views_count
      seo {
        ...SeoFragment
      }
      categories {
        data {
          ...PartialCategoryFragment
        }
      }
      cover {
        data {
          ...ImageEntityFragment
        }
      }
      tags {
        data {
          ...TagEntityFragment
        }
      }
      blocks {
        ...RichTextBlockFragment
      }
    }
  }
`;
