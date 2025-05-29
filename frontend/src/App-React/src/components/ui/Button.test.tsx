/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('se renderiza correctamente con texto', () => {
    render(<Button>Click aquí</Button>);
    const button = screen.getByRole('button', { name: /click aquí/i });
    expect(button).toBeInTheDocument();
  });

  it('muestra el contenido de children', () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('se desactiva cuando se pasa la prop disabled', () => {
    render(<Button disabled>Desactivado</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('ejecuta onClick cuando se hace clic', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Haz clic</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('acepta el atributo type="submit"', () => {
    render(<Button type="submit">Enviar</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('tiene las clases de estilo por defecto', () => {
    render(<Button>Estilos</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-indigo-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('font-semibold');
    expect(button).toHaveClass('hover:bg-indigo-700');
    expect(button).toHaveClass('transition');
  });

  it('permite clases personalizadas con className', () => {
    render(<Button className="text-xl">Con clase extra</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-xl');

    expect(button).toHaveClass('bg-indigo-600');
  });

  it('aplica clases de estilo cuando está deshabilitado', () => {
    render(<Button disabled>Deshabilitado</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });
});
