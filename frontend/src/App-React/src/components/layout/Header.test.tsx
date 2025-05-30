/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('se renderiza correctamente', () => {
    render(<Header />);
    const header = screen.getByText('BLWIN');
    expect(header).toBeInTheDocument();
  });

  it('muestra el texto "BLWIN"', () => {
    render(<Header />);
    const header = screen.getByText('BLWIN');
    expect(header).toHaveTextContent('BLWIN');
  });

  it('utiliza un elemento <header>', () => {
    const { container } = render(<Header />);
    expect(container.firstChild?.nodeName).toBe('HEADER');
  });

  it('tiene las clases de estilo esperadas', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass('w-full');
    expect(container.firstChild).toHaveClass('py-6');
    expect(container.firstChild).toHaveClass('bg-indigo-600');
    expect(container.firstChild).toHaveClass('text-white');
    expect(container.firstChild).toHaveClass('text-center');
    expect(container.firstChild).toHaveClass('text-4xl');
    expect(container.firstChild).toHaveClass('font-extrabold');
    expect(container.firstChild).toHaveClass('shadow-md');
  });
});
