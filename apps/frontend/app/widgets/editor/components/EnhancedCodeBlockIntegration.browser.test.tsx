import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PoseDocument } from '@repo/ui/components/PoseDocument';

describe('Enhanced Code Block Integration', () => {
  it('should create and render code block with language and file name', async () => {
    // Create a document with a code block that has language and fileName
    const doc = {
      content: [
        {
          attrs: {
            fileName: 'src/components/Button.tsx',
            language: 'typescript',
          },
          content: [
            {
              text: 'interface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n}',
              type: 'text',
            },
          ],
          type: 'codeBlock',
        },
      ],
      type: 'doc',
    };

    render(<PoseDocument doc={doc} />);

    // Verify the enhanced code block renders correctly
    expect(screen.getByText('src/components/Button.tsx')).toBeInTheDocument();
    expect(screen.getByText(/interface ButtonProps/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });

  it('should handle code blocks without file names', () => {
    const doc = {
      content: [
        {
          attrs: {
            language: 'javascript',
          },
          content: [
            {
              text: 'console.log("Hello, World!");',
              type: 'text',
            },
          ],
          type: 'codeBlock',
        },
      ],
      type: 'doc',
    };

    render(<PoseDocument doc={doc} />);

    expect(screen.queryByText('src/components/Button.tsx')).not.toBeInTheDocument();
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });

  it('should handle code blocks with special characters in file names', () => {
    const doc = {
      content: [
        {
          attrs: {
            fileName: 'src/utils/data_processor.py',
            language: 'python',
          },
          content: [
            {
              text: 'def process_data(data):\n    return data.upper()',
              type: 'text',
            },
          ],
          type: 'codeBlock',
        },
      ],
      type: 'doc',
    };

    render(<PoseDocument doc={doc} />);

    expect(screen.getByText('src/utils/data_processor.py')).toBeInTheDocument();
    expect(screen.getByText(/def process_data/)).toBeInTheDocument();
  });

  it('should truncate very long file names', () => {
    const longFileName = 'src/very/long/path/to/a/file/that/is/too/long/to/display/fully/without/truncation.ts';

    const doc = {
      content: [
        {
          attrs: {
            fileName: longFileName,
            language: 'typescript',
          },
          content: [
            {
              text: '// This is a very long file path',
              type: 'text',
            },
          ],
          type: 'codeBlock',
        },
      ],
      type: 'doc',
    };

    render(<PoseDocument doc={doc} />);

    const fileNameElement = screen.getByText(longFileName);
    expect(fileNameElement).toHaveClass('truncate');
    expect(fileNameElement).toHaveAttribute('title', longFileName);
  });
});
