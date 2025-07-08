import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CodeBlock } from '@repo/ui/components/CodeBlock';

// Mock the clipboard API
const mockWriteText = vi.fn();

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteText.mockClear();
  });

  it('should render code block with language', () => {
    render(<CodeBlock language="typescript">console.log("test");</CodeBlock>);

    expect(screen.getByText('console.log("test");')).toBeInTheDocument();
  });

  it('should render code block with file name', () => {
    render(
      <CodeBlock fileName="src/test.ts" language="typescript">
        console.log("test");
      </CodeBlock>
    );

    expect(screen.getByText('src/test.ts')).toBeInTheDocument();
  });

  it('should render copy button by default', () => {
    render(<CodeBlock language="typescript">console.log("test");</CodeBlock>);

    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });

  it('should hide copy button when showCopyButton is false', () => {
    render(
      <CodeBlock language="typescript" showCopyButton={false}>
        console.log("test");
      </CodeBlock>
    );

    expect(screen.queryByRole('button', { name: /copy code/i })).not.toBeInTheDocument();
  });

  it('should show "Copy" text after copy animation ends', async () => {
    mockWriteText.mockResolvedValue(undefined);

    render(<CodeBlock language="typescript">console.log("test");</CodeBlock>);

    const copyButton = screen.getByRole('button', { name: /copy code/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    // Wait for the timeout to reset the text
    await waitFor(
      () => {
        expect(screen.getByText('Copy')).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('should handle clipboard errors gracefully', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard error'));

    render(<CodeBlock language="typescript">console.log("test");</CodeBlock>);

    const copyButton = screen.getByRole('button', { name: /copy code/i });
    fireEvent.click(copyButton);

    // Should not throw an error
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
    });
  });

  it('should truncate long file names', () => {
    const longFileName = 'src/very/long/path/to/a/file/that/is/too/long/to/display/fully.ts';

    render(
      <CodeBlock fileName={longFileName} language="typescript">
        console.log("test");
      </CodeBlock>
    );

    const fileNameElement = screen.getByText(longFileName);
    expect(fileNameElement).toHaveClass('truncate');
    expect(fileNameElement).toHaveAttribute('title', longFileName);
  });
});
