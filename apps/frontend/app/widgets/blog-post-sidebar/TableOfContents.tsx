import { TableOfContentsIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@repo/ui/components/Link';
import { Paper } from '@repo/ui/components/Paper';
import { cn } from '@repo/ui/lib/utils';

export interface TableOfContentsItem {
  id: string;
  title: ReactNode;
  level: number;
}

interface TableOfContentsProps {
  items?: TableOfContentsItem[];
  className?: string;
}

export const TableOfContents: FC<TableOfContentsProps> = ({ items = [], className }) => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>('');

  // Track which section is currently in view
  useEffect(() => {
    if (items.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all section elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Paper className={cn('sticky max-h-96 overflow-y-auto', className)}>
      <div className="mb-3 flex cursor-pointer items-center justify-between">
        <h3 className="flex items-center space-x-2 font-semibold text-foreground">
          <TableOfContentsIcon />
          <span>{t('Table of Contents')}</span>
        </h3>
      </div>

      <nav aria-label="Table of contents navigation" className="space-y-1" ref={navRef}>
        {items.map((item) => (
          <Link
            aria-label={`Jump to section: ${item.title}`}
            className={cn('block text-sm transition-colors hover:text-primary', {
              'font-medium text-primary': activeId === item.id,
              'ps-3': item.level === 2,
              'ps-6': item.level === 3,
              'text-muted-foreground': activeId !== item.id,
            })}
            key={item.id}
            to={{ hash: item.id }}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </Paper>
  );
};
