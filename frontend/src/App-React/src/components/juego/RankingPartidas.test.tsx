/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RankingPartidas from './RankingPartidas';
import confetti from 'canvas-confetti'; // ✅ Importamos directamente

// ✅ Mock de canvas-confetti correctamente espía
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// 🔁 Datos de ejemplo reutilizables
const baseRanking = [
  { posicion: 1, nombreUsuario: 'Alice', puntos: 300, esUsuarioActual: true, usuarioId: 1 },
  { posicion: 2, nombreUsuario: 'Bob', puntos: 250, esUsuarioActual: false, usuarioId: 2 },
  { posicion: 3, nombreUsuario: 'Charlie', puntos: 200, esUsuarioActual: false, usuarioId: 3 },
  { posicion: 4, nombreUsuario: 'David', puntos: 180, esUsuarioActual: false, usuarioId: 4 },
  { posicion: 5, nombreUsuario: 'Eve', puntos: 160, esUsuarioActual: false, usuarioId: 5 },
  { posicion: 6, nombreUsuario: 'Frank', puntos: 140, esUsuarioActual: false, usuarioId: 6 },
  { posicion: 7, nombreUsuario: 'Grace', puntos: 120, esUsuarioActual: false, usuarioId: 7 },
  { posicion: 8, nombreUsuario: 'Hank', puntos: 100, esUsuarioActual: false, usuarioId: 8 },
  { posicion: 9, nombreUsuario: 'Ivy', puntos: 90, esUsuarioActual: false, usuarioId: 9 },
  { posicion: 10, nombreUsuario: 'Jake', puntos: 80, esUsuarioActual: false, usuarioId: 10 },
];

const mockOnSalir = vi.fn();

describe('RankingPartidas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('muestra el título y la puntuación del usuario actual', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
    expect(screen.getByText(/🎮 partida finalizada/i)).toBeInTheDocument();
    expect(screen.getByText(/tu puntuación:/i)).toBeInTheDocument();
    expect(screen.getByText(/300 puntos/i)).toBeInTheDocument();
  });

  it('muestra el ranking del top 10 correctamente', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
  
    baseRanking.slice(0, 10).forEach((jugador) => {
      const textoEsperado = `${jugador.posicion}º - ${jugador.nombreUsuario}`;
      const elemento = screen.queryByText((content) =>
        content.replace(/\s+/g, ' ').trim().includes(textoEsperado)
      );
      expect(elemento).toBeInTheDocument();
    });
  });
  

  it('llama a onSalir cuando se hace clic en el botón de salir', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
    const salirBtn = screen.getByRole('button', { name: /salir al inicio/i });
    fireEvent.click(salirBtn);
    expect(mockOnSalir).toHaveBeenCalled();
  });

  it('muestra mensaje especial si el usuario es el primero', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
    expect(screen.getByText(/¡eres el rey de la partida!/i)).toBeInTheDocument();
  });

  it('lanza confeti si el jugador está en el top 10', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
    expect(confetti).toHaveBeenCalled();
  });

  it('muestra botón de nueva partida', () => {
    render(<RankingPartidas ranking={baseRanking} onSalir={mockOnSalir} />);
    expect(screen.getByRole('button', { name: /nueva partida/i })).toBeInTheDocument();
  });

  it('muestra mensaje motivador si el jugador está fuera del top 10', () => {
    // ✅ Solo uno debe ser esUsuarioActual: true y fuera del top 10
    const rankingFueraDelTop = [
      { posicion: 1, nombreUsuario: 'Alice', puntos: 300, esUsuarioActual: false, usuarioId: 1 },
      { posicion: 2, nombreUsuario: 'Bob', puntos: 250, esUsuarioActual: false, usuarioId: 2 },
      // ... hasta 10
      { posicion: 10, nombreUsuario: 'Jake', puntos: 80, esUsuarioActual: false, usuarioId: 10 },
      { posicion: 15, nombreUsuario: 'You', puntos: 50, esUsuarioActual: true, usuarioId: 99 },
    ];
  
    render(<RankingPartidas ranking={rankingFueraDelTop} onSalir={mockOnSalir} />);
  
    // 💡 Buscar mensaje motivador
    expect(
      screen.getByText('¡Sigue así, estás mejorando!')
    ).toBeInTheDocument();
  
    // ✅ Confirma que se muestra su posición correctamente
    expect(screen.getByText('15º - You')).toBeInTheDocument();
  });
  
});
