import { ExternalLink } from 'lucide-react';
import { Suspense } from 'react';

import { Badge } from '@repo/ui/components/Badge';
import * as GridCard from '@repo/ui/components/GridCard';
import { Skeleton } from '@repo/ui/components/Skeleton';

import { useRelatedArticlesQuery } from '@entities/articles/api/article-relation.api';

import { getRelationTypeLabel, groupRelatedArticlesByType, sortRelatedArticles } from '../model/article-relation.model';

interface RelatedArticlesContentProps {
  articleId: string;
  className?: string;
}

interface RelatedArticlesProps {
  articleId: string;
  className?: string;
}

export const RelatedArticlesContent = ({ articleId }: RelatedArticlesContentProps) => {
  const { data, isLoading, error, isError } = useRelatedArticlesQuery({ id: articleId, locale: 'en' });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: it's a skeleton
            <Skeleton className="h-24 w-full" key={`loading-skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-destructive text-sm">{error?.error?.message || 'Failed to load related articles'}</p>
      </div>
    );
  }

  const { data: relatedArticles } = data;

  if (relatedArticles.length === 0) {
    return (
      <div className="rounded-lg border border-muted p-4 text-center">
        <p className="text-muted-foreground text-sm">No related articles found</p>
      </div>
    );
  }

  const sortedArticles = sortRelatedArticles(relatedArticles);
  const groupedArticles = groupRelatedArticlesByType(sortedArticles);

  return (
    <div className="space-y-6">
      {/* Related Articles */}
      {groupedArticles.related.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{getRelationTypeLabel('related')}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {groupedArticles.related.map((relatedArticle) => (
              <RelatedArticleCard article={relatedArticle} key={relatedArticle.article.id} />
            ))}
          </div>
        </div>
      )}

      {/* Further Reading */}
      {groupedArticles.furtherReading.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{getRelationTypeLabel('furtherReading')}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {groupedArticles.furtherReading.map((relatedArticle) => (
              <RelatedArticleCard article={relatedArticle} key={relatedArticle.article.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface RelatedArticleCardProps {
  article: {
    article: {
      id: string;
      title: string;
      slug: string;
      publishedAt: string | null;
      readingTime: number;
      shortDescription: string | null;
    };
    relationType: 'related' | 'furtherReading';
    direction: 'source' | 'target';
    order: number;
  };
}

const RelatedArticleCard = ({ article }: RelatedArticleCardProps) => {
  const { article: articleData, relationType } = article;

  return (
    <GridCard.Root className="group transition-shadow hover:shadow-md">
      <GridCard.GridCardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="line-clamp-2 font-medium transition-colors group-hover:text-primary">
              <a className="hover:underline" href={`/blog/${articleData.slug}`}>
                {articleData.title}
              </a>
            </h4>
            <Badge className="text-xs" variant="secondary">
              {relationType === 'furtherReading' ? 'Further' : 'Related'}
            </Badge>
          </div>

          {articleData.shortDescription && (
            <p className="line-clamp-2 text-muted-foreground text-sm">{articleData.shortDescription}</p>
          )}

          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <div className="flex items-center gap-4">
              {articleData.publishedAt && <span>{new Date(articleData.publishedAt).toLocaleDateString()}</span>}
              {articleData.readingTime && <span>{articleData.readingTime} min read</span>}
            </div>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </GridCard.GridCardContent>
    </GridCard.Root>
  );
};

export const RelatedArticles = ({ articleId, className = '' }: RelatedArticlesProps) => {
  return (
    <div className={className}>
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Related Articles</h2>
      </div>
      <div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: it's a skeleton
                  <Skeleton className="h-24 w-full" key={`fallback-skeleton-${i}`} />
                ))}
              </div>
            </div>
          }
        >
          <RelatedArticlesContent articleId={articleId} />
        </Suspense>
      </div>
    </div>
  );
};
