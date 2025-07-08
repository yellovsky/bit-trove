import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CodeBlockMain } from './CodeBlockPopover';

describe('CodeBlockPopover', () => {
  it('should render language and file name inputs in the main content', () => {
    render(<CodeBlockMain />);

    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/file name/i)).toBeInTheDocument();
  });

  it('should have language options', () => {
    render(<CodeBlockMain />);

    const languageSelect = screen.getByRole('combobox', { name: /language/i });
    expect(languageSelect).toBeInTheDocument();
  });

  it('should have file name input with correct attributes', () => {
    render(<CodeBlockMain />);

    const fileNameInput = screen.getByRole('textbox', { name: /file name/i });
    expect(fileNameInput).toHaveAttribute('placeholder', 'e.g. src/components/Button.tsx');
    expect(fileNameInput).toHaveAttribute('spellCheck', 'false');
    expect(fileNameInput).toHaveAttribute('autoCapitalize', 'off');
    expect(fileNameInput).toHaveAttribute('autoCorrect', 'off');
  });
});
