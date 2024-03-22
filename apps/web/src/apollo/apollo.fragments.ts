// global modules
import { gql } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';

import { SEO_FRAGMENT } from '@repo/api-models/seo';
import { TAG_ENTITY_FRAGMENT } from '@repo/api-models/tag';
import { IMAGE_ENTITY_FRAGMENT } from '@repo/api-models/image';
import { RICH_TEXT_BLOCK_FRAGMENT } from '@repo/api-models/block';
import { FULL_CATEGORY_FRAGMENT, PARTIAL_CATEGORY_FRAGMENT } from '@repo/api-models/category';
import { FULL_BLOG_POST_FRAGMENT, PARTIAL_BLOG_POST_FRAGMENT } from '@repo/api-models/blog-post';

export const fragments = createFragmentRegistry(gql`
  ${IMAGE_ENTITY_FRAGMENT}
  ${SEO_FRAGMENT}
  ${TAG_ENTITY_FRAGMENT}
  ${FULL_BLOG_POST_FRAGMENT}
  ${PARTIAL_BLOG_POST_FRAGMENT}
  ${RICH_TEXT_BLOCK_FRAGMENT}
  ${FULL_CATEGORY_FRAGMENT}
  ${PARTIAL_CATEGORY_FRAGMENT}
`);
