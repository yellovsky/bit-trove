import { ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { To } from 'react-router';

import type { ShortArticle } from '@repo/api-models';
import * as GridCardPrimitive from '@repo/ui/components/GridCard';
import { Link } from '@repo/ui/components/Link';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { useRelativeDate } from '@shared/lib/use-relative-date';

import { makeArticleFilename } from '@entities/articles';

/* -------------------------------------------------------------------------------------------------
 * ArticleGridCard
 * -----------------------------------------------------------------------------------------------*/
const ARTICLE_GRID_CARD_NAME = 'ArticleGridCard';

interface ArticleGridCardProps extends GridCardPrimitive.GridCardProps {
  article: ShortArticle;
  to: To;
}

const ArticleGridCard: FC<ArticleGridCardProps> = ({ article, to, ...props }) => {
  const { t } = useTranslation();
  const filename = makeArticleFilename(article.title);
  const relativeDate = useRelativeDate(article.publishedAt ?? '');

  return (
    <GridCardPrimitive.Root asChild {...props}>
      <Link
        aria-label={article.title}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        to={to}
      >
        <GridCardPrimitive.CardHeader>
          <GridCardPrimitive.CardHeaderContent>
            <GridCardPrimitive.CardIcon generateOn={filename} />
            <GridCardPrimitive.CardHeaderText className="@lg:text-xs @sm:text-sm">
              {filename}
            </GridCardPrimitive.CardHeaderText>
          </GridCardPrimitive.CardHeaderContent>
          <GridCardPrimitive.CardHeaderBullet generateOn={filename} />
        </GridCardPrimitive.CardHeader>

        <GridCardPrimitive.CardContent className="@lg:p-4 @sm:p-3">
          <GridCardPrimitive.CardTitle className="@lg:text-lg @sm:text-base @xl:text-xl">
            {article.title}
          </GridCardPrimitive.CardTitle>
          <GridCardPrimitive.CardDescription className="@lg:text-base @sm:text-sm @xl:text-sm">
            {article.shortDescription}
          </GridCardPrimitive.CardDescription>

          <GridCardPrimitive.CardFooter className="@lg:mt-3 @sm:mt-2">
            <GridCardPrimitive.CardFooterGroup>
              <GridCardPrimitive.CardDate className="@lg:text-sm @sm:text-xs">
                {relativeDate}
              </GridCardPrimitive.CardDate>
            </GridCardPrimitive.CardFooterGroup>

            {!article.readingTime ? null : (
              <GridCardPrimitive.CardTextWithIcon
                className="@lg:text-sm @sm:text-xs"
                icon={<ClockIcon size={14} strokeWidth={1.5} />}
              >
                {t('{{number}} min read', { number: article.readingTime })}
              </GridCardPrimitive.CardTextWithIcon>
            )}
          </GridCardPrimitive.CardFooter>
        </GridCardPrimitive.CardContent>
      </Link>
    </GridCardPrimitive.Root>
  );
};

ArticleGridCard.displayName = ARTICLE_GRID_CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * ArticleGridCardPending
 * -----------------------------------------------------------------------------------------------*/
const ARTICLE_GRID_CARD_PENDING_NAME = 'ArticleGridCardPending';

type ArticleGridCardPendingProps = GridCardPrimitive.GridCardProps;

const ArticleGridCardPending: FC<ArticleGridCardPendingProps> = (props) => (
  <GridCardPrimitive.Root {...props}>
    <GridCardPrimitive.CardHeader>
      <GridCardPrimitive.CardHeaderContent>
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-24" />
      </GridCardPrimitive.CardHeaderContent>
      <Skeleton className="h-3 w-3 rounded-full" />
    </GridCardPrimitive.CardHeader>

    <GridCardPrimitive.CardContent>
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-2/3" />

      <GridCardPrimitive.CardFooter>
        <GridCardPrimitive.CardFooterGroup>
          <Skeleton className="h-3 w-16" />
        </GridCardPrimitive.CardFooterGroup>
        <Skeleton className="h-3 w-20" />
      </GridCardPrimitive.CardFooter>
    </GridCardPrimitive.CardContent>
  </GridCardPrimitive.Root>
);

ArticleGridCardPending.displayName = ARTICLE_GRID_CARD_PENDING_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ArticleGridCard, ArticleGridCardPending };
export type { ArticleGridCardProps, ArticleGridCardPendingProps };
