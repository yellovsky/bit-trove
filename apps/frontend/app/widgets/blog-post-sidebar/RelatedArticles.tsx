import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Link } from '@repo/ui/components/Link';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  readingTime: number;
  publishedAt: string;
}

interface RelatedArticlesProps {
  articles?: RelatedArticle[];
  className?: string;
}

export const RelatedArticles: FC<RelatedArticlesProps> = ({ articles = [], className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Lazy loading with intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section aria-label="Related articles" className={`space-y-3 ${className}`} ref={containerRef}>
      <h3 className="font-semibold text-card-foreground text-sm">Related Articles</h3>
      {isVisible && (
        <div className="space-y-2">
          {articles.map((article) => (
            <article className="rounded-lg border border-border bg-card p-3" key={article.id}>
              <div className="mb-2">
                <Link
                  aria-label={`Read article: ${article.title}`}
                  className="line-clamp-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                  to={`/blog/${article.slug}`}
                >
                  {article.title}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{article.readingTime} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
