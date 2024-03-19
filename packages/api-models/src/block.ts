// global modules
import { gql } from '@apollo/client';

export type RichTextBlockragment = {
  __typename: 'ComponentBlocksRichTextBlock';
  id: string;
  title: string | undefined;
  body: string | undefined;
};

export const RICH_TEXT_BLOCK_FRAGMENT = gql`
  fragment RichTextBlockFragment on ComponentBlocksRichTextBlock {
    __typename
    ... on ComponentBlocksRichTextBlock {
      id
      title
      body
    }
  }
`;
