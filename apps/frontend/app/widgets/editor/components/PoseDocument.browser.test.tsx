import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PoseDocument } from '@repo/ui/components/PoseDocument';

describe('PoseDocument', () => {
  it('should render code block with language and file name', () => {
    const doc = {
      content: [
        {
          attrs: {
            fileName: 'src/components/Button.tsx',
            language: 'typescript',
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

    expect(screen.getByText('src/components/Button.tsx')).toBeInTheDocument();
    expect(screen.getByText('console.log("Hello, World!");')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });

  it('should render code block with only language (no file name)', () => {
    const doc = {
      content: [
        {
          attrs: {
            language: 'javascript',
          },
          content: [
            {
              text: 'const x = 42;',
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
    expect(screen.getByText('const x = 42;')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });
});
