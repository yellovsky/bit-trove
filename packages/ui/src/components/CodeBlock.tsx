import { type FC, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock: FC<CodeBlockProps> = (props) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const fn = () =>
      codeToHtml(props.children, {
        lang: props.language,
        theme: 'nord',
      }).then(setHtml);

    fn();
  }, [props.children, props.language]);

  return html ? (
    <div
      className="mb-4 whitespace-pre [&>pre]:rounded-md [&>pre]:px-6 [&>pre]:py-5"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: it's a code block
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <div className="mb-4 whitespace-pre [&>pre]:rounded-default [&>pre]:bg-[#2e3440] [&>pre]:px-6 [&>pre]:py-5">
      <pre>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};
