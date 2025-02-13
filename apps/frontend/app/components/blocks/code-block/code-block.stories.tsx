// global modules
import type { ArticleCodeBlock } from '@repo/api-models';
import type { Meta, StoryObj } from '@storybook/react';

// local modules
import { CodeBlock } from './code-block.component';

const codeBlock: ArticleCodeBlock = {
  content: {
    variants: [
      {
        filename: './src/tmp/mock.tsx',
        label: null,
        language: 'tsx',
        text: `const CodeBlockContent: FC<CodeBlockContentProps> = ({ filename, language, text }) => {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <div className={codeBlockCn}>
      <div className={headerCn}>
        <div className={filenameCn}>{filename}</div>
        <div>{language}</div>
        <div>
          <IconButton onClick={copy} variant="soft">
            <Icon type="copy" />
          </IconButton>
        </div>
      </div>
      <SyntaxHighlighter customStyle={{ background: 'none' }} language={language} style={a11yDark}>
        {text}
      </SyntaxHighlighter>
    </div>
  );
};`,
      },
    ],
  },
  subtitle: null,
  title: null,
  type: 'code',
};

const shBlock: ArticleCodeBlock = {
  content: {
    variants: [
      {
        filename: null,
        label: 'npm',
        language: 'bash',
        text: 'npm install react',
      },
      {
        filename: null,
        label: 'yarn',
        language: 'bash',
        text: 'yarn add react',
      },
      {
        filename: null,
        label: 'pnpm',
        language: 'bash',
        text: 'pnpm install react',
      },
    ],
  },
  subtitle: null,
  title: null,
  type: 'code',
};

const meta = {
  component: CodeBlock,
  tags: ['autodocs'],
  title: 'Components/Blocks/CodeBlock',

  args: { block: shBlock },
  argTypes: {},
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const tsx: Story = { args: { block: codeBlock } };
