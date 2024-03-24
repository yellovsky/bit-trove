'use client';

// global modules
import { useEffect, type FC } from 'react';
import { useLocale } from 'next-intl';

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
  const locale = useLocale();
  const [mutate] = useMutation<boolean, { itemID: string }>(INCREMENT_BLOG_POST_VIEWS_COUNT);

  useEffect(() => {
    mutate({ variables: { itemID, locale } });
  }, [mutate, itemID, locale]);

  return null;
};
