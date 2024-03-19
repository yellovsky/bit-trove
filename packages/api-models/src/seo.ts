// global modules
import { gql } from '@apollo/client'

export type SeoFragment = {
  title: string
  description: string
  keywords: string
}

export const SEO_FRAGMENT = gql`
  fragment SeoFragment on ComponentSeoSeo {
    title
    description
    keywords
  }
`
