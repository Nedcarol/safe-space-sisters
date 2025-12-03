import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders with default variant', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with destructive variant', () => {
    const { getByRole } = render(<Button variant="destructive">Delete</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Delete');
    expect(button.className).toContain('destructive');
  });

  it('renders with outline variant', () => {
    const { getByRole } = render(<Button variant="outline">Outline</Button>);
    const button = getByRole('button');
    expect(button.className).toContain('border');
  });

  it('renders disabled button', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
  });

  it('renders different sizes', () => {
    const { getByRole, rerender } = render(<Button size="sm">Small</Button>);
    expect(getByRole('button').className).toContain('h-8');

    rerender(<Button size="lg">Large</Button>);
    expect(getByRole('button').className).toContain('h-10');
  });
});
