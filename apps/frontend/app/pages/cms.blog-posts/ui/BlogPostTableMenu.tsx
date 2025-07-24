import { IconEye, IconEyeX, IconPencil, IconTrash } from '@tabler/icons-react';
import { EllipsisIcon, LoaderIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortBlogPost } from '@repo/api-models';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/DropdownMenu';
import { Link } from '@repo/ui/components/Link';
import { Toggle } from '@repo/ui/components/Toggle';

import { getEditBlogPostLink } from '@features/blog-posts';

import { usePublishBlogPostMutation, useUnpublishBlogPostMutation } from '@entities/blog-posts';

interface BlogPostTableMenuProps {
  blogPost: ShortBlogPost;
}

export const BlogPostTableMenu: FC<BlogPostTableMenuProps> = ({ blogPost }) => {
  const { t: tCms } = useTranslation('cms');
  const { mutate: publishBlogPost, isPending: isPublishPending } = usePublishBlogPostMutation();
  const { mutate: unpublishBlogPost, isPending: isUnpublishPending } = useUnpublishBlogPostMutation();

  const pending = isPublishPending || isUnpublishPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle variant="dimmed">
          <EllipsisIcon />
        </Toggle>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to={getEditBlogPostLink(blogPost)}>
            <IconPencil size={14} />
            {tCms('edit_action')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            if (blogPost.publishedAt) unpublishBlogPost(blogPost.id);
            else publishBlogPost(blogPost.id);
          }}
        >
          {/* TODO make spinner */}
          {pending ? <LoaderIcon size={14} /> : blogPost.publishedAt ? <IconEyeX size={14} /> : <IconEye size={14} />}
          {blogPost.publishedAt ? tCms('unpublish_action') : tCms('publish_action')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <IconTrash size={14} />
          {tCms('delete_action')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
