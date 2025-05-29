/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import GradientCharacter from './GradientCharacter';

describe('GradientCharacter', () => {
  const props = {
    src: '/personajes/personaje1.png',
    alt: 'Personaje 1',
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-pink-400',
  };

  it('se renderiza correctamente', () => {
    render(<GradientCharacter {...props} />);
    const image = screen.getByAltText('Personaje 1');
    expect(image).toBeInTheDocument();
  });

  it('muestra la imagen con el src y alt proporcionados', () => {
    render(<GradientCharacter {...props} />);
    const image = screen.getByAltText('Personaje 1');
    expect(image).toHaveAttribute('src', '/personajes/personaje1.png');
    expect(image).toHaveAttribute('alt', 'Personaje 1');
  });

  it('muestra el fondo degradado con las clases gradientFrom y gradientTo', () => {
    const { container } = render(<GradientCharacter {...props} />);

    const gradientDiv = container.firstChild?.firstChild as HTMLDivElement;

    expect(gradientDiv).toHaveClass('absolute');
    expect(gradientDiv).toHaveClass('w-64', 'h-64');
    expect(gradientDiv).toHaveClass('bg-gradient-to-br');
    expect(gradientDiv).toHaveClass('rounded-full');
    expect(gradientDiv).toHaveClass('blur-2xl');
    expect(gradientDiv).toHaveClass('opacity-60');
    expect(gradientDiv).toHaveClass('from-indigo-400');
    expect(gradientDiv).toHaveClass('to-pink-400');
  });

  it('la imagen tiene las clases de estilo esperadas', () => {
    render(<GradientCharacter {...props} />);
    const image = screen.getByAltText('Personaje 1');
    expect(image).toHaveClass('max-h-[450px]');
    expect(image).toHaveClass('w-auto');
    expect(image).toHaveClass('object-contain');
    expect(image).toHaveClass('drop-shadow-lg');
    expect(image).toHaveClass('relative');
    expect(image).toHaveClass('z-10');
  });

  it('el contenedor principal tiene las clases de estilo esperadas', () => {
    const { container } = render(<GradientCharacter {...props} />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('relative');
  });
});
