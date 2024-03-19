// global modules
import { gql } from '@apollo/client'

export type ImageEntityFragment = {
  attributes: {
    url: string
  }
}

export const IMAGE_ENTITY_FRAGMENT = gql`
  fragment ImageEntityFragment on UploadFileEntity {
    attributes {
      url
    }
  }
`
