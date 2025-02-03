// global modules
import type { ArticleBlock } from '@repo/api-models';
import { useTranslation } from 'react-i18next';
import { type FC, memo, useMemo } from 'react';

// common modules
import { Link } from '~/components/link';
import { slugify } from '~/utils/slugify';

// local modules
import { link as linkCn, list as listCn, title as titleCn } from './blocks-index.module.scss';

interface IndexNode {
  hash: string;
  title: string;
  children: IndexNode[];
}

const getIndexNodes = (blocks: ArticleBlock[]): IndexNode[] =>
  blocks.reduce((accum, block) => {
    if (block.title) {
      return [...accum, { children: [], hash: slugify(block.title), title: block.title }];
    } else if (block.subtitle) {
      const last = accum.at(-1);
      last?.children.push({ children: [], hash: slugify(block.subtitle), title: block.subtitle });
      return accum;
    } else {
      return accum;
    }
  }, [] as IndexNode[]);

interface BlocksIndexProps {
  className?: string;
  blocks: ArticleBlock[];
}

export const BlocksIndex: FC<BlocksIndexProps> = memo(({ className, blocks }) => {
  const { t } = useTranslation();
  const indexNodes = useMemo(() => getIndexNodes(blocks), [blocks]);

  return !indexNodes.length ? null : (
    <div className={className}>
      <div className={titleCn}>{t('ARTICLE_INDEX_TITLE')}</div>

      <ul className={listCn}>
        {indexNodes.map(node => (
          <li key={node.hash}>
            <Link
              className={linkCn}
              dangerouslySetInnerHTML={{ __html: node.title }}
              to={{ hash: node.hash }}
              variant="text"
            />

            {!node.children.length ? null : (
              <ul className={listCn}>
                {node.children.map(child => (
                  <li key={child.hash}>
                    <Link
                      className={linkCn}
                      dangerouslySetInnerHTML={{ __html: child.title }}
                      to={{ hash: child.hash }}
                      variant="text"
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
