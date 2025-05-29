/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import HeaderWithLogo from './HeaderWithLogo';

describe('HeaderWithLogo', () => {
  it('se renderiza sin errores', () => {
    render(<HeaderWithLogo />);
    const title = screen.getByText('TRIVIADOS');
    const logo = screen.getByAltText('Logo');
    expect(title).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it('muestra el título "TRIVIADOS"', () => {
    render(<HeaderWithLogo />);
    const title = screen.getByRole('heading', { name: 'TRIVIADOS' });
    expect(title).toHaveTextContent('TRIVIADOS');
  });

  it('el título está en un <h1>', () => {
    render(<HeaderWithLogo />);
    const title = screen.getByRole('heading', { name: 'TRIVIADOS' });
    expect(title.tagName).toBe('H1');
  });

  it('la imagen del logo tiene src y alt correctos', () => {
    render(<HeaderWithLogo />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toHaveAttribute('src', '/logo.png');
    expect(logo).toHaveAttribute('alt', 'Logo');
  });

  it('la imagen tiene las clases de estilo esperadas', () => {
    render(<HeaderWithLogo />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toHaveClass('w-16');
    expect(logo).toHaveClass('h-16');
    expect(logo).toHaveClass('object-contain');
    expect(logo).toHaveClass('drop-shadow-md');
  });

  it('el título tiene las clases de estilo esperadas', () => {
    render(<HeaderWithLogo />);
    const title = screen.getByRole('heading', { name: 'TRIVIADOS' });
    expect(title).toHaveClass('text-6xl');
    expect(title).toHaveClass('font-extrabold');
    expect(title).toHaveClass('text-indigo-700');
    expect(title).toHaveClass('drop-shadow-xl');
  });

  it('el contenedor tiene las clases de estilo esperadas', () => {
    const { container } = render(<HeaderWithLogo />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('gap-4');
    expect(container.firstChild).toHaveClass('mb-12');
    expect(container.firstChild).toHaveClass('flex-wrap');
    expect(container.firstChild).toHaveClass('text-center');
  });
});
