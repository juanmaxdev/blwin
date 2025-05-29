/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Slogan from './Slogan';

describe('Slogan', () => {
  it('se renderiza correctamente', () => {
    render(<Slogan />);
    const heading = screen.getByRole('heading', { level: 1 });
    const paragraph = screen.getByText(/juega, aprende y desafía/i);

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('muestra el texto del encabezado correctamente', () => {
    render(<Slogan />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(
      '¡Pon a prueba tus conocimientos en el reto más divertido de preguntas!'
    );
  });

  it('muestra el texto descriptivo correctamente', () => {
    render(<Slogan />);
    const paragraph = screen.getByText(/juega, aprende y desafía/i);

    expect(paragraph).toHaveTextContent(
      'Juega, aprende y desafía a tus amigos con Triviados 🎉'
    );
  });

  it('aplica las clases correctas al contenedor principal', () => {
    const { container } = render(<Slogan />);
    expect(container.firstChild).toHaveClass('text-center');
    expect(container.firstChild).toHaveClass('md:text-left');
    expect(container.firstChild).toHaveClass('max-w-lg');
  });

  it('el encabezado tiene las clases de estilo esperadas', () => {
    render(<Slogan />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('font-extrabold');
    expect(heading).toHaveClass('text-indigo-700');
    expect(heading).toHaveClass('mb-4');
    expect(heading).toHaveClass('leading-tight');
  });

  it('el párrafo tiene las clases de estilo esperadas', () => {
    render(<Slogan />);
    const paragraph = screen.getByText(/triviados/i);

    expect(paragraph).toHaveClass('text-lg');
    expect(paragraph).toHaveClass('text-indigo-800');
  });
});
