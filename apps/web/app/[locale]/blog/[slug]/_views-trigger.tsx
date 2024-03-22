'use client';

// global modules
import { useEffect, type FC } from 'react';
import { gql, useMutation } from '@apollo/client';

const INCREMENT_BLOG_POST_VIEWS_COUNT = gql`
  mutation IncrementBlogPostViews($itemID: ID!) {
    incrementBlogPostViews(itemID: $itemID) {
      ...FullBlogPostFragment
    }
  }
`;

interface ViewsTriggerProps {
  itemID: string;
}

export const ViewsTrigger: FC<ViewsTriggerProps> = ({ itemID }) => {
  const [mutate] = useMutation<boolean, { itemID: string }>(INCREMENT_BLOG_POST_VIEWS_COUNT);

  useEffect(() => {
    mutate({ variables: { itemID } });
  }, [mutate, itemID]);

  return null;
};
