'use client';

// global modules
import { useEffect, type FC } from 'react';
import { SmallViewsBadge } from '@repo/ui/small-views-badge';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBlogpostViews, incrementBlogpostViews } from '@repo/api-models/blog-post';

interface BlogpostViewsCountProps {
  id: number;
  className?: string;
  increment?: boolean;
}

export const BlogpostViewsCount: FC<BlogpostViewsCountProps> = ({ className, id, increment }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['blogpost_views_count', id],
    queryFn: getBlogpostViews,
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
