import type { ComponentProps, FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { RelatedArticles as RelatedArticlesComponent } from '@features/articles';

/* -------------------------------------------------------------------------------------------------
 * RelatedArticles
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'RelatedArticles';

type RelatedArticlesProps = ComponentProps<'section'> & {
  articleId?: string;
};

const RelatedArticles: FC<RelatedArticlesProps> = ({ articleId, className, ...rest }) => {
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

  return !articleId ? null : (
    <section aria-label="Related articles" className={className} ref={containerRef} {...rest}>
      {isVisible && <RelatedArticlesComponent articleId={articleId} className="space-y-3" />}
    </section>
  );
};

RelatedArticles.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { RelatedArticles };

export type { RelatedArticlesProps };
