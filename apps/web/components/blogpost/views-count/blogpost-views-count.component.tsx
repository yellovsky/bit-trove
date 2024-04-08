'use client';

// global modules
import { SmallViewsBadge } from '@bit-trove/ui/small-views-badge';
import { type FC, useEffect } from 'react';
import { getBlogpostViews, incrementBlogpostViews } from '@bit-trove/api-models/blog-post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface BlogpostViewsCountProps {
  id: number;
  className?: string;
  increment?: boolean;
}

export const BlogpostViewsCount: FC<BlogpostViewsCountProps> = ({ className, id, increment }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: getBlogpostViews,
    queryKey: ['blogpost_views_count', id],
  });

  const { mutate } = useMutation({
    mutationFn: incrementBlogpostViews,
    onSuccess: (response) => queryClient.setQueryData(['blogpost_views_count', id], response),
  });

  useEffect(() => {
    if (increment) mutate(id);
  }, [mutate, id, increment]);

  return <SmallViewsBadge className={className} viewsCount={data?.data?.attributes.views_count} />;
};
