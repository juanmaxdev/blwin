// src/App-React/pages/juegos/ahorcado/Ahorcado.test.tsx

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Ahorcado from './Ahorcado';

// Mock de imágenes 
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_1.png', () => ({ default: 'ahorcado_1.png' }));
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_2.png', () => ({ default: 'ahorcado_2.png' }));
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_3.png', () => ({ default: 'ahorcado_3.png' }));
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_4.png', () => ({ default: 'ahorcado_4.png' }));
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_5.png', () => ({ default: 'ahorcado_5.png' }));
vi.mock('../../../components/juegos/ahorcado/modelo/ahorcado_6.png', () => ({ default: 'ahorcado_6.png' }));

// Mock del hook mandarPuntuacion
vi.mock('../../../hooks/MandarPuntuacion', () => ({
  mandarPuntuacion: vi.fn().mockResolvedValue(undefined),
}));

// Mock de useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('<Ahorcado />', () => {
  it('renderiza el título, nivel inicial y puntuación inicial', () => {
    render(<Ahorcado />);

    // Verifica que el título principal esté presente
    expect(screen.getByText(/Juego del Ahorcado/i)).toBeInTheDocument();

    // Verifica que aparezca "Nivel:" y, dentro de ese párrafo, el número "1"
    expect(screen.getByText(/Nivel:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    // Verifica que aparezca "Puntuación:" y, dentro de ese párrafo, el número "0"
    expect(screen.getByText(/Puntuación:/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renderiza botones para todas las letras del alfabeto', () => {
    render(<Ahorcado />);

    // Deben existir 27 botones (A-Z y Ñ)
    const botones = screen.getAllByRole('button', { name: /^[A-ZÑ]$/i });
    expect(botones).toHaveLength(27);
  });

  it('al hacer clic en VOLVER, llama a navigate con "/"', () => {
    render(<Ahorcado />);

    const botonVolver = screen.getByRole('button', { name: /volver/i });
    fireEvent.click(botonVolver);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
