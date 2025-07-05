import { ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortBlogPost } from '@repo/api-models';
import * as GridCardPrimitive from '@repo/ui/components/GridCard';
import { Link } from '@repo/ui/components/link';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { getBlogPostLink } from '../lib/links';

interface BlogPostCardProps {
  blogPost: ShortBlogPost;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({ blogPost }) => {
  const { t } = useTranslation();
  const filename = [blogPost.title.replace(/ /g, '-').toLowerCase(), '.md'].join('');
  const relativeDate = useRelativeDate(blogPost.publishedAt ?? '');

  return (
    <GridCardPrimitive.Root asChild>
      <Link to={getBlogPostLink(blogPost)} variant="unstyled">
        <GridCardPrimitive.CardHeader>
          <GridCardPrimitive.CardHeaderContent>
            <GridCardPrimitive.CardIcon generateOn={filename} />
            <GridCardPrimitive.CardHeaderText>{filename}</GridCardPrimitive.CardHeaderText>
          </GridCardPrimitive.CardHeaderContent>
          <GridCardPrimitive.CardHeaderBullet generateOn={filename} />
        </GridCardPrimitive.CardHeader>

        <GridCardPrimitive.CardContent>
          <GridCardPrimitive.CardTitle>{blogPost.title}</GridCardPrimitive.CardTitle>
          <GridCardPrimitive.CardDescription>{blogPost.shortDescription}</GridCardPrimitive.CardDescription>

          <GridCardPrimitive.CardFooter>
            <GridCardPrimitive.CardFooterGroup>
              <GridCardPrimitive.CardDate>{relativeDate}</GridCardPrimitive.CardDate>
            </GridCardPrimitive.CardFooterGroup>

            {!blogPost.readingTime ? null : (
              <GridCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
                {t('{{number}} min read', { number: blogPost.readingTime })}
              </GridCardPrimitive.CardTextWithIcon>
            )}
          </GridCardPrimitive.CardFooter>
        </GridCardPrimitive.CardContent>
      </Link>
    </GridCardPrimitive.Root>
  );
};
