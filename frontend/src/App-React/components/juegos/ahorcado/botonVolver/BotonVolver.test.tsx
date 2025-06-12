import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Boton from './BotonVolver';

describe('<Boton />', () => {
  const reloadMock = vi.fn();

  beforeEach(() => {
    // Simula window.parent.location.reload
    Object.defineProperty(window, 'parent', {
      value: {
        location: {
          reload: reloadMock,
        },
      },
      writable: true,
    });

    reloadMock.mockClear();
  });

  it('renderiza el botón con el texto pasado por props', () => {
    render(<Boton nombre="VOLVER" />);
    const boton = screen.getByRole('button', { name: /volver/i });
    expect(boton).toBeInTheDocument();
  });

  it('al hacer clic recarga la página (window.parent.location.reload)', () => {
    render(<Boton nombre="INICIO" />);
    const boton = screen.getByRole('button', { name: /inicio/i });
    fireEvent.click(boton);
    expect(reloadMock).toHaveBeenCalled();
  });
});
