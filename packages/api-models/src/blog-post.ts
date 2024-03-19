// global modules
import { gql } from '@apollo/client'
import type { TagEntityFragment } from '@repo/api-models/tag'
import type { ImageEntityFragment } from '@repo/api-models/image'
import type { SeoFragment } from '@repo/api-models/seo'

export type BlogPostEntityFragment = {
  id: string
  attributes: {
    title: string
    slug: string
    seo: SeoFragment
    tags: { data: TagEntityFragment[] }
    cover: { data: ImageEntityFragment | null }
  }
}

export const BLOG_POST_ENTITY_FRAGMENT = gql`
  fragment BlogPostEntityFragment on BlogpostEntity {
    id
    attributes {
      title
      slug
      seo {
        ...SeoFragment
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
`
