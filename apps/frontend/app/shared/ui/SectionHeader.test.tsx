import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '@repo/ui/components/Button';

import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with custom title ID', () => {
    render(<SectionHeader title="Test Title" titleId="custom-id" />);

    const heading = screen.getByText('Test Title');
    expect(heading).toHaveAttribute('id', 'custom-id');
  });

  it('renders with custom order', () => {
    render(<SectionHeader order={2} title="Test Title" />);

    const heading = screen.getByText('Test Title');
    expect(heading.tagName).toBe('H2');
  });

  it('renders action when provided', () => {
    const action = <Button>Action Button</Button>;
    render(<SectionHeader action={action} title="Test Title" />);

    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('does not render action container when no action provided', () => {
    render(<SectionHeader title="Test Title" />);

    // The main container should exist
    const mainContainer = screen.getByText('Test Title').closest('div');
    expect(mainContainer).toBeInTheDocument();

    // Check that there's no action div (the second div child)
    const actionDiv = mainContainer?.children[1];
    expect(actionDiv).toBeUndefined();
  });

  it('applies custom className', () => {
    render(<SectionHeader className="custom-class" title="Test Title" />);

    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('renders with default props', () => {
    render(<SectionHeader title="Test Title" />);

    const heading = screen.getByText('Test Title');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('mb-6');
  });

  it('renders complex action with multiple elements', () => {
    const action = (
      <div>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </div>
    );
    render(<SectionHeader action={action} title="Test Title" />);

    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });
});
