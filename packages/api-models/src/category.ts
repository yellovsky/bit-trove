// global modules
import { gql } from '@apollo/client';
import type { SeoFragment } from '@repo/api-models/seo';
import type { ImageEntityFragment } from '@repo/api-models/image';

// ==================================================
//           F U L L   F R A G M E N T
// ==================================================
export type FullCategoryFragment = {
  id: string;

  attributes: {
    slug: string;
    name: string;
    description: string | null;

    seo: SeoFragment | null;
    cover: { data: ImageEntityFragment | null };
  };
};

export const FULL_CATEGORY_FRAGMENT = gql`
  fragment FullCategoryFragment on CategoryEntity {
    id
    attributes {
      slug
      name
      description

      seo {
        ...SeoFragment
      }

      cover {
        data {
          ...ImageEntityFragment
        }
      }
    }
  }
`;

// ==================================================
//         P A R T I A L   F R A G M E N T
// ==================================================
export type PatrialCategoryFragment = {
  id: string;

  attributes: {
    slug: string;
    name: string;
    cover: { data: ImageEntityFragment | null };
  };
};

export const PARTIAL_CATEGORY_FRAGMENT = gql`
  fragment PartialCategoryFragment on CategoryEntity {
    id
    attributes {
      slug
      name

      cover {
        data {
          ...ImageEntityFragment
        }
      }
    }
  }
`;
