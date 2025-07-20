import { ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { To } from 'react-router';

import type { ShortArticle } from '@repo/api-models';
import { Link } from '@repo/ui/components/Link';
import * as ListCardPrimitive from '@repo/ui/components/ListCard';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { useRelativeDate } from '@shared/lib/use-relative-date';

interface ArticleListCardProps extends ListCardPrimitive.ListCardProps {
  article: ShortArticle;
  to: To;
}

export const ArticleListCard: FC<ArticleListCardProps> = ({ article, to, ...props }) => {
  const { t } = useTranslation();
  const relativeDate = useRelativeDate(article.publishedAt ?? article.createdAt);

  return (
    <ListCardPrimitive.Root asChild {...props}>
      <Link aria-label={article.title} to={to}>
        <ListCardPrimitive.CardContent>
          <ListCardPrimitive.CardHeader>
            <ListCardPrimitive.CardTitle>{article.title}</ListCardPrimitive.CardTitle>
            <ListCardPrimitive.ListCardHeaderBadge color="blue">Article</ListCardPrimitive.ListCardHeaderBadge>
          </ListCardPrimitive.CardHeader>
          <ListCardPrimitive.ListCardDescription>{article.shortDescription}</ListCardPrimitive.ListCardDescription>
          <ListCardPrimitive.ListCardFooter>
            {article.author && (
              <ListCardPrimitive.ListCardAuthor>{article.author.name}</ListCardPrimitive.ListCardAuthor>
            )}
            <ListCardPrimitive.ListCardDate>{relativeDate}</ListCardPrimitive.ListCardDate>
            <ListCardPrimitive.CardTextWithIcon icon={<ClockIcon size={14} strokeWidth={1.5} />}>
              <span>{t('{{number}} min read', { number: article.readingTime })}</span>
            </ListCardPrimitive.CardTextWithIcon>
          </ListCardPrimitive.ListCardFooter>
        </ListCardPrimitive.CardContent>

        <ListCardPrimitive.CardAside>
          {!article.tags.length ? null : (
            <ListCardPrimitive.ListCardTagsList>
              {article.tags.map((tag) => (
                <ListCardPrimitive.ListCardTag key={tag.id}>{tag.name}</ListCardPrimitive.ListCardTag>
              ))}
            </ListCardPrimitive.ListCardTagsList>
          )}
        </ListCardPrimitive.CardAside>
        <ListCardPrimitive.CardArrow />
      </Link>
    </ListCardPrimitive.Root>
  );
};

export const ArticleListCardPending: FC = () => <Skeleton className="h-28" />;
