import { ClockIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { To } from 'react-router';

import type { ShortArticle } from '@repo/api-models';
import * as GridCardPrimitive from '@repo/ui/components/GridCard';
import { Link } from '@repo/ui/components/link';

import { useRelativeDate } from '@shared/lib/use-relative-date';

interface ArticleListCardProps extends GridCardPrimitive.GridCardProps {
  article: ShortArticle;
  to: To;
}

export const ArticleListCard: FC<ArticleListCardProps> = ({ article, to, ...props }) => {
  const { t } = useTranslation();
  const filename = [article.title.replace(/ /g, '-').toLowerCase(), '.md'].join('');
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
