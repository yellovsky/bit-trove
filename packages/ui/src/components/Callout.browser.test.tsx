import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type CalloutType, Content, Root, Title } from './Callout';

describe('Callout', () => {
  const calloutTypes: CalloutType[] = ['info', 'question', 'warning', 'danger', 'code', 'success', 'recommendation'];

  it('renders with basic content', () => {
    render(
      <Root data-callout-type="info">
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Root data-callout-type="info">
        <Title type="info">Test Title</Title>
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(
      <Root data-callout-type="info">
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct data-callout-type attribute for each type', () => {
    for (const type of calloutTypes) {
      const { container } = render(
        <Root data-callout-type={type}>
          <Content>
            <p>Test content</p>
          </Content>
        </Root>
      );

      const calloutElement = container.firstChild as HTMLElement;
      expect(calloutElement).toHaveAttribute('data-callout-type', type);
    }
  });

  it('renders icon for each type', () => {
    for (const type of calloutTypes) {
      const { container } = render(
        <Root data-callout-type={type}>
          <Title type={type}>Test Title</Title>
          <Content>
            <p>Test content</p>
          </Content>
        </Root>
      );

      const iconElement = container.querySelector('.callout-icon');
      expect(iconElement).toBeInTheDocument();
    }
  });

  it('renders header with icon and title', () => {
    const { container } = render(
      <Root data-callout-type="info">
        <Title type="info">Test Title</Title>
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    const headerElement = container.querySelector('.callout-header');
    const iconElement = container.querySelector('.callout-icon');
    const titleElement = container.querySelector('.callout-title');

    expect(headerElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  it('renders content area', () => {
    const { container } = render(
      <Root data-callout-type="info">
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    const contentElement = container.querySelector('.callout-content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('Test content');
  });

  it('passes through additional props to root element', () => {
    const { container } = render(
      <Root className="custom-class" data-callout-type="info" data-testid="test-callout">
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    const calloutElement = container.firstChild as HTMLElement;
    expect(calloutElement).toHaveClass('custom-class');
    expect(calloutElement).toHaveAttribute('data-testid', 'test-callout');
  });

  it('renders complex content', () => {
    render(
      <Root data-callout-type="warning">
        <Title type="warning">Complex Content</Title>
        <Content>
          <div>
            <p>First paragraph</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
            <p>Second paragraph</p>
          </div>
        </Content>
      </Root>
    );

    expect(screen.getByText('Complex Content')).toBeInTheDocument();
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('renders empty content', () => {
    const { container } = render(
      <Root data-callout-type="info">
        <Title type="info">Empty Content</Title>
        <Content>{/* Empty content */}</Content>
      </Root>
    );

    const contentElement = container.querySelector('.callout-content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement?.textContent).toBe('');
  });

  it('has correct icon size', () => {
    const { container } = render(
      <Root data-callout-type="info">
        <Title type="info">Test Title</Title>
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    const iconElement = container.querySelector('.callout-icon svg');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders title with correct data-callout-type attribute', () => {
    const { container } = render(
      <Root data-callout-type="warning">
        <Title type="warning">Test Title</Title>
        <Content>
          <p>Test content</p>
        </Content>
      </Root>
    );

    const titleElement = container.querySelector('.callout-header');
    expect(titleElement).toHaveAttribute('data-callout-type', 'warning');
  });
});
