import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { type ArticleWithRelation, isShortBlogPost, isShortShard } from '@repo/api-models';
import * as GridCard from '@repo/ui/components/GridCard';
import { Link } from '@repo/ui/components/Link';
import { Skeleton } from '@repo/ui/components/Skeleton';
import { cn } from '@repo/ui/lib/utils';

import { useRelativeDate } from '@shared/lib/use-relative-date';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

import { getBlogPostLink } from '@features/blog-posts';
import { getShardLink } from '@features/shards';

import { useRelatedArticlesQuery } from '@entities/articles';

import { filterRelatedArticlesByType } from '../model/article-relation.model';

/* -------------------------------------------------------------------------------------------------
 * RelatedArticleCard
 * -----------------------------------------------------------------------------------------------*/
const RELATED_ARTICLE_CARD_NAME = 'RelatedArticleCard';

interface RelatedArticleCardProps {
  relation: ArticleWithRelation;
}

const RelatedArticleCard: FC<RelatedArticleCardProps> = ({ relation }) => {
  const relativeDate = useRelativeDate(relation.article.createdAt);
  const to = isShortBlogPost(relation.article)
    ? getBlogPostLink(relation.article)
    : isShortShard(relation.article)
      ? getShardLink(relation.article)
      : '/';

  return (
    <GridCard.Root asChild className="group transition-shadow hover:shadow-md">
      <Link to={to}>
        <GridCard.GridCardContent className="p-4">
          <GridCard.CardTitle>{relation.article.title}</GridCard.CardTitle>
          <GridCard.CardDescription>{relation.article.shortDescription}</GridCard.CardDescription>
          <GridCard.CardFooter>
            <GridCard.CardDate>{relativeDate}</GridCard.CardDate>
          </GridCard.CardFooter>
        </GridCard.GridCardContent>
      </Link>
    </GridCard.Root>
  );
};

RelatedArticleCard.displayName = RELATED_ARTICLE_CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * RelatedArticlesUnsafe
 * -----------------------------------------------------------------------------------------------*/
const RELATED_ARTICLES_UNSAFE_NAME = 'RelatedArticlesUnsafe';

interface RelatedArticlesUnsafeProps {
  articleId: string;
  className?: string;
}

const RelatedArticlesUnsafe: FC<RelatedArticlesUnsafeProps> = ({ articleId, className }) => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useRelatedArticlesQuery({ id: articleId, locale: i18n.language });
  const relatedArticles = filterRelatedArticlesByType('related', data?.data ?? []).slice(0, 6);

  const content =
    !isLoading && !relatedArticles.length ? null : (
      <div className={cn('@container', className)}>
        <h2 className="mb-4 font-semibold text-xl">{t('Related Articles')}</h2>

        <div className="grid @sm:grid-cols-2 grid-cols-1 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: it's a skeleton
                <Skeleton className="h-20 w-full" key={i} />
              ))
            : relatedArticles.map((article) => <RelatedArticleCard key={article.id} relation={article} />)}
        </div>
      </div>
    );

  return <ErrorBoundary>{content}</ErrorBoundary>;
};

RelatedArticlesUnsafe.displayName = RELATED_ARTICLES_UNSAFE_NAME;

/* -------------------------------------------------------------------------------------------------
 * RelatedArticles
 * -----------------------------------------------------------------------------------------------*/
const RELATED_ARTICLES_NAME = 'RelatedArticles';

type RelatedArticlesProps = RelatedArticlesUnsafeProps;

const RelatedArticles: FC<RelatedArticlesProps> = (props) => (
  <ErrorBoundary fallback={null}>
    <RelatedArticlesUnsafe {...props} />
  </ErrorBoundary>
);

RelatedArticles.displayName = RELATED_ARTICLES_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { RelatedArticles };
export type { RelatedArticlesProps };
