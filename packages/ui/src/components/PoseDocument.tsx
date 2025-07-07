import slugify from '@sindresorhus/slugify';
import type { JSONContent } from '@tiptap/core';
import { cx } from 'class-variance-authority';
import { type ComponentProps, type FC, Fragment, type ReactNode } from 'react';

import { CodeBlock } from '@repo/ui/components/CodeBlock';
import {
  Blockquote,
  Code,
  Heading,
  HorizontalRule,
  Kbd,
  ListItem,
  OrderedList,
  Paragraph,
  TextLink,
  UnorderedList,
} from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

export const getJsonContentTitleString = (c: JSONContent): string =>
  c.type === 'text' ? c.text || '' : c.content?.length ? c.content.map(getJsonContentTitleString).join('') : '';

export function renderPoseNode(node: JSONContent): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case 'paragraph':
      return <Paragraph>{renderPoseContent(node.content)}</Paragraph>;

    case 'heading':
      return (
        <Heading id={slugify(getJsonContentTitleString(node))} order={node.attrs?.level}>
          {renderPoseContent(node.content)}
        </Heading>
      );

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
          <TextLink {...restAttrs} className={className} to={href}>
            {node.text}
          </TextLink>
        );
      }

      const kbdMark = node.marks?.find((m) => m.type === 'kbd');
      if (kbdMark) return <Kbd>{node.text}</Kbd>;

      const codeMark = node.marks?.find((m) => m.type === 'code');
      if (codeMark) return <Code>{node.text}</Code>;

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
      return <HorizontalRule />;

    case 'doc':
      return renderPoseContent(node.content);

    case 'hardBreak':
      return <br />;

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

export const renderPoseTitle = (node: JSONContent): ReactNode => {
  switch (node.type) {
    case 'text': {
      const className = cn({
        'font-bold': node.marks?.some((m) => m.type === 'bold'),
        italic: node.marks?.some((m) => m.type === 'italic'),
        underline: node.marks?.some((m) => m.type === 'underline'),
      });

      const linkMark = node.marks?.find((m) => m.type === 'link');
      if (linkMark) {
        // biome-ignore lint/suspicious/noExplicitAny: suppose it's ok
        const { href, ...restAttrs } = linkMark.attrs as any;

        return (
          <TextLink {...restAttrs} className={className} to={href}>
            {node.text}
          </TextLink>
        );
      }

      const kbdMark = node.marks?.find((m) => m.type === 'kbd');
      if (kbdMark) return <Kbd>{node.text}</Kbd>;

      const codeMark = node.marks?.find((m) => m.type === 'code');
      if (codeMark) return <Code>{node.text}</Code>;

      return className ? <span className={className}>{node.text}</span> : node.text;
    }

    default:
      console.warn('Unsupported node', node);
      return <>{node.content?.map(renderPoseTitle)}</>;
  }
};

export interface PoseDocumentProps extends ComponentProps<'div'> {
  doc: JSONContent;
}

export const PoseDocument: FC<PoseDocumentProps> = ({ doc, className, ...rest }) => {
  return (
    <div className={cn('typography-root', className)} {...rest}>
      {renderPoseNode(doc)}
    </div>
  );
};
