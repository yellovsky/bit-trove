// global modules
import { gql } from '@apollo/client';
import type { ImageEntityFragment } from '@repo/api-models/image';

export type TagEntityFragment = {
  id: string;
  attributes: {
    slug: string;
    name: string;
    image: { data: ImageEntityFragment | null };
  };
};

export const TAG_ENTITY_FRAGMENT = gql`
  fragment TagEntityFragment on TagEntity {
    id
    attributes {
      slug
      name
      image {
        data {
          ...ImageEntityFragment
        }
      }
    }
  }
`;
