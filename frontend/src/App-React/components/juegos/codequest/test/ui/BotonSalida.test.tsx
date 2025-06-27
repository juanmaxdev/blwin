import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BotonSalida from '../../ui/BotonSalida';

vi.mock('../../../../assets/juegos/codequest/personaje/personaje_salida.png', () => '/fake-image.png');

describe('BotonSalida', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  it('renderiza el botón con la imagen', () => {
    render(<BotonSalida />);

    const imagen = screen.getByAltText('Salir') as HTMLImageElement;

    expect(imagen).toBeInTheDocument();
    expect(imagen.src).toContain('personaje_salida.png'); // esta línea sustituye al mock
  });

 it('redirige a / cuando se hace clic', () => {
  const reloadMock = vi.fn();
  Object.defineProperty(window, 'parent', {
    value: { location: { reload: reloadMock } },
    writable: true,
  });

  render(<BotonSalida />);
  const boton = screen.getByRole('button');
  fireEvent.click(boton);

  expect(reloadMock).toHaveBeenCalled(); 
});
});
