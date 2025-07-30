import slugify from '@sindresorhus/slugify';
import type { FC } from 'react';

import type { Article } from '@repo/api-models';
import { getJsonContentTitleString, renderPoseTitleNode } from '@repo/ui/components/PoseDocument';

import { TableOfContents, type TableOfContentsItem } from '@widgets/blog-post-sidebar';

/* -------------------------------------------------------------------------------------------------
 * ArticleTableOfContents
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ArticleTableOfContents';

interface ArticleTableOfContentsProps {
  className?: string;
  article: Article;
}

const ArticleTableOfContents: FC<ArticleTableOfContentsProps> = ({ article, className }) => {
  const headings = article?.contentJSON?.content?.filter((c) => c.type === 'heading');
  const tocItems: TableOfContentsItem[] | undefined = !headings?.length
    ? undefined
    : [
        {
          id: slugify(article?.title ?? ''),
          level: 1,
          title: article?.title,
        },
        ...headings.map((c) => ({
          id: slugify(getJsonContentTitleString(c)),
          level: c.attrs?.level ?? 2,
          title: renderPoseTitleNode(c),
        })),
      ];

  return <TableOfContents className={className} items={tocItems} />;
};

ArticleTableOfContents.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ArticleTableOfContents };

export type { ArticleTableOfContentsProps };
