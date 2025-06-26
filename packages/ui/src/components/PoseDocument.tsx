import type { JSONContent } from '@tiptap/core';
import { cx } from 'class-variance-authority';
import { type FC, Fragment } from 'react';

import { Blockquote } from '@repo/ui/components/Blockquote';
import { Code } from '@repo/ui/components/Code';
import { CodeBlock } from '@repo/ui/components/CodeBlock';
import { Divider } from '@repo/ui/components/Divider';
import { Heading } from '@repo/ui/components/Heading';
import { Kbd } from '@repo/ui/components/Kbd';
import { Link } from '@repo/ui/components/Link';
import { ListItem, OrderedList, UnorderedList } from '@repo/ui/components/List';
import { Paragraph } from '@repo/ui/components/Paragraph';

export function renderPoseNode(node: JSONContent): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case 'paragraph':
      return <Paragraph>{renderPoseContent(node.content)}</Paragraph>;

    case 'heading':
      return <Heading order={node.attrs?.level}>{renderPoseContent(node.content)}</Heading>;

    case 'text': {
      const className = cx({
        'font-bold': node.marks?.some((m) => m.type === 'bold'),
        italic: node.marks?.some((m) => m.type === 'italic'),
        underline: node.marks?.some((m) => m.type === 'underline'),
      });

      const linkMark = node.marks?.find((m) => m.type === 'link');
      if (linkMark) {
        // biome-ignore lint/suspicious/noExplicitAny: suppose it's ok
        const { href, ...restAttrs } = linkMark.attrs as any;

        return (
          <Link {...restAttrs} className={className} to={href}>
            {node.text}
          </Link>
        );
      }

      const kbdMark = node.marks?.find((m) => m.type === 'kbd');
      if (kbdMark) {
        return <Kbd>{node.text}</Kbd>;
      }

      const codeMark = node.marks?.find((m) => m.type === 'code');
      if (codeMark) {
        return <Code>{node.text}</Code>;
      }

      return className ? <span className={className}>{node.text}</span> : node.text;
    }

    case 'blockquote':
      return <Blockquote>{renderPoseContent(node.content)}</Blockquote>;

    case 'bulletList':
      return <UnorderedList>{renderPoseContent(node.content)}</UnorderedList>;

    case 'orderedList':
      return <OrderedList>{renderPoseContent(node.content)}</OrderedList>;

    case 'listItem':
      return <ListItem>{renderPoseContent(node.content)}</ListItem>;

    case 'codeBlock': {
      const language = node.attrs?.language;
      const code = node.content?.[0]?.text;
      return code ? <CodeBlock language={language}>{code}</CodeBlock> : null;
    }

    case 'horizontalRule':
      return <Divider />;

    case 'doc':
      return renderPoseContent(node.content);

    default:
      console.warn('Unsupported node', node);
      return renderPoseContent(node.content);
  }
}

export function renderPoseContent(content: JSONContent[] | undefined): React.ReactNode {
  if (!content) return null;

  // biome-ignore lint/suspicious/noArrayIndexKey: it's ok =(
  return content.map((child, index) => <Fragment key={index}>{renderPoseNode(child)}</Fragment>);
}

export interface PoseDocumentProps {
  doc: JSONContent;
}

export const PoseDocument: FC<PoseDocumentProps> = ({ doc }) => {
  return <div>{renderPoseNode(doc)}</div>;
};
