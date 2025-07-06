import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Link } from '@repo/ui/components/Link';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TableOfContentsItem[];
  className?: string;
}

export const TableOfContents: FC<TableOfContentsProps> = ({ items = [], className = '' }) => {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for table of contents
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!navRef.current) return;

      const links = navRef.current.querySelectorAll('a');
      const currentIndex = Array.from(links).indexOf(document.activeElement as HTMLAnchorElement);

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % links.length;
          (links[nextIndex] as HTMLElement)?.focus();
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          const prevIndex = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
          (links[prevIndex] as HTMLElement)?.focus();
          break;
        }
        case 'Home':
          event.preventDefault();
          (links[0] as HTMLElement)?.focus();
          break;
        case 'End':
          event.preventDefault();
          (links[links.length - 1] as HTMLElement)?.focus();
          break;
      }
    };

    if (items.length > 0 && isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [items.length, isVisible]);

  if (items.length === 0) {
    return (
      <section aria-label="Table of contents" className={`rounded-lg border border-border bg-card p-4 ${className}`}>
        <h3 className="mb-3 font-semibold text-card-foreground text-sm">Table of Contents</h3>
        <p className="text-muted-foreground text-sm">No headings found in this article.</p>
      </section>
    );
  }

  return (
    <section aria-label="Table of contents" className={`rounded-lg border border-border bg-card p-4 ${className}`}>
      <h3 className="mb-3 font-semibold text-card-foreground text-sm">Table of Contents</h3>
      <nav aria-label="Table of contents navigation" ref={navRef}>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                aria-label={`Jump to section: ${item.title}`}
                className={`block text-muted-foreground text-sm transition-colors hover:text-foreground ${
                  item.level === 1 ? 'font-medium' : item.level === 2 ? 'ml-3' : 'ml-6'
                }`}
                to={`#${item.id}`}
                variant="unstyled"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
