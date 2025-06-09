// src/components/juegos/ahorcado/botonVolver/BotonVolver.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Boton from './BotonVolver';

// Mock de react-router-dom para interceptar useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('<Boton />', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renderiza el botón con el texto pasado por props', () => {
    render(<Boton nombre="VOLVER" />);
    const boton = screen.getByRole('button', { name: /volver/i });
    expect(boton).toBeInTheDocument();
  });

  it('al hacer clic invoca navigate("/")', () => {
    render(<Boton nombre="INICIO" />);
    const boton = screen.getByRole('button', { name: /inicio/i });
    fireEvent.click(boton);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
