// global modules
import { gql } from '@apollo/client';
import type { Fragment } from '@repo/api-models/apollo';
import type { SeoFragment } from '@repo/api-models/seo';
import type { TagEntityFragment } from '@repo/api-models/tag';
import type { ImageEntityFragment } from '@repo/api-models/image';
import type { RichTextBlockragment } from '@repo/api-models/block';
import type { PatrialCategoryFragment } from '@repo/api-models/category';
import type { SupportedLocale } from '@bit-trove/localization/config';

// ==========================================================
//              F U L L   F R A G M E N T
// ==========================================================
export type FullBlogPostFragment = Fragment<
  'BlogpostEntity',
  {
    title: string;
    slug: string;
    seo: SeoFragment;
    views_count: number;
    tags: { data: TagEntityFragment[] };
    cover: { data: ImageEntityFragment | null };
    blocks: RichTextBlockragment[];
    categories: { data: PatrialCategoryFragment[] };
  }
>;

export const FULL_BLOG_POST_FRAGMENT = gql`
  fragment FullBlogPostFragment on BlogpostEntity {
    id
    attributes {
      __typename

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

// ==========================================================
//         F U L L   F R A G M E N T   Q U E R Y
// ==========================================================
export type FullBlogPostQueryResponse = {
  blogposts: {
    data: FullBlogPostFragment[];
  };
};

export type FullBlogPostVariables = { slug: string };

export const FULL_BLOG_POST_QUERY = gql`
  query GetBlogPost($slug: String) {
    blogposts(filters: { slug: { eq: $slug } }) {
      data {
        ...FullBlogPostFragment
      }
    }
  }
`;

// ==========================================================
//             P A R T I A L   F R A G M E N T
// ==========================================================
export type PartialBlogPostFragment = Fragment<
  'BlogpostEntity',
  {
    title: string;
    slug: string;
    views_count: number;
    tags: { data: TagEntityFragment[] };
    cover: { data: ImageEntityFragment | null };
    categories: { data: PatrialCategoryFragment[] };
  }
>;

export const PARTIAL_BLOG_POST_FRAGMENT = gql`
  fragment PartialBlogPostFragment on BlogpostEntity {
    id
    attributes {
      __typename

      title
      slug
      views_count
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
    }
  }
`;

// ==========================================================
//   P A R T I A L   F R A G M E N T   L I S T   Q U E R Y
// ==========================================================
export type BlogPostListVariables = {
  sort: Array<'createdAt:desc' | 'createdAt:asc'>;
  limit?: number;
  offset?: number;
  locale: SupportedLocale;
};

export type BlogPostListQueryResponse = {
  blogposts: {
    data: PartialBlogPostFragment[];
  };
};

export const PARTIAL_BLOG_POST_LIST_QUERY = gql`
  query GetBlogPostList($locale: I18NLocaleCode, $offset: Int, $limit: Int, $sort: [String]) {
    blogposts(locale: $locale, pagination: { start: $offset, limit: $limit }, sort: $sort) {
      data {
        ...PartialBlogPostFragment
      }
    }
  }
`;

// ==========================================================
//                  L I N K
// ==========================================================
export const blogPostLink = (blogpost: Fragment<'BlogpostEntity', { slug: string }>): string =>
  `/blog/${blogpost.attributes.slug}`;
