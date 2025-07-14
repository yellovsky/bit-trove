import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { RelatedArticles as RelatedArticlesComponent } from '@features/articles/ui/RelatedArticles';

interface RelatedArticlesProps {
  articleId?: string;
  className?: string;
}

export const RelatedArticles: FC<RelatedArticlesProps> = ({ articleId, className = '' }) => {
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

  if (!articleId) return null;

  return (
    <section aria-label="Related articles" className={className} ref={containerRef}>
      {isVisible && <RelatedArticlesComponent articleId={articleId} className="space-y-3" />}
    </section>
  );
};
