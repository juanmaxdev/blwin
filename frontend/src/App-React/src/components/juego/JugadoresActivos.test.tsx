/// <reference types="vitest" />
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JugadoresActivos from './JugadoresActivos';

const mockJugadores = [
  {
    usuarioId: 1,
    nombreUsuario: 'Esther',
    puntos: 1200,
    vidasRestantes: 3
  },
  {
    usuarioId: 2,
    nombreUsuario: 'Luis',
    puntos: 900,
    vidasRestantes: 1
  },
  {
    usuarioId: 3,
    nombreUsuario: 'Iván',
    puntos: 850,
    vidasRestantes: 2
  },
  {
    usuarioId: 4,
    nombreUsuario: 'Lucía',
    puntos: 800,
    vidasRestantes: 0
  },
  {
    usuarioId: 5,
    nombreUsuario: 'Carlos',
    puntos: 750,
    vidasRestantes: 1
  },
  {
    usuarioId: 99, // usuario fuera del top5
    nombreUsuario: 'JugadorActual',
    puntos: 400,
    vidasRestantes: 2
  }
];

describe('JugadoresActivos', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.setItem('usuarioId', '99');

    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockJugadores)
    });

    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renderiza el título y los jugadores del top 5 más el jugador actual fuera del top', async () => {
    render(<JugadoresActivos />);

    // Título
    expect(await screen.findByText('Jugadores Activos')).toBeInTheDocument();

    // Top 5
    for (const jugador of mockJugadores.slice(0, 5)) {
      expect(await screen.findByText(jugador.nombreUsuario)).toBeInTheDocument();
    }

    // Jugador actual fuera del top
    expect(await screen.findByText('JugadorActual')).toBeInTheDocument();

    // Puntos
    expect(await screen.findByText('1200 pts')).toBeInTheDocument();
    expect(await screen.findByText('400 pts')).toBeInTheDocument();
  });

  it('muestra correctamente corazones y corazones rotos según vidas restantes', async () => {
    render(<JugadoresActivos />);
    await screen.findByText('Esther');

    // Esther: 3 vidas
    expect(screen.getAllByText('❤️').length).toBeGreaterThanOrEqual(3);
    expect(screen.queryAllByText('💔').length).toBeGreaterThanOrEqual(1);
  });

  it('muestra separadores ("...") si jugador actual no está en el top 5', async () => {
    render(<JugadoresActivos />);
    const puntosJugadorActual = await screen.findByText('400 pts');
    expect(puntosJugadorActual).toBeInTheDocument();

    const separadores = screen.getAllByText('...');
    expect(separadores.length).toBeGreaterThanOrEqual(1);
  });

  it('resalta al jugador actual con fondo amarillo', async () => {
    render(<JugadoresActivos />);
    const jugadorActual = await screen.findByText('JugadorActual');

    // Asegurarse de que el contenedor padre tenga clase bg-yellow-200
    expect(jugadorActual.closest('.bg-yellow-200')).toBeTruthy();
  });
});
