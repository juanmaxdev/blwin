/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Juego from './Juego';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import axios from 'axios';

// Mocks de componentes
vi.mock('../components/juego/RuletaTematicas', () => ({
  default: ({ onSelect }: { onSelect: (tematica: string) => void }) => (
    <button onClick={() => onSelect('Cine')}>Girar Ruleta</button>
  ),
}));
vi.mock('../components/juego/HeaderJuego', () => ({
  default: () => <div>HeaderJuego</div>,
}));
vi.mock('../components/juego/ModalTematica', () => ({
  default: ({ tematica }: { tematica: string }) => <div>Modal: {tematica}</div>,
}));
vi.mock('../components/juego/PreguntaCard', () => ({
  default: ({ onRespuesta }: any) => (
    <div>
      PreguntaCard
      <button onClick={() => onRespuesta(true, 'VF')}>Responder Bien</button>
      <button onClick={() => onRespuesta(false, 'VF')}>Responder Mal</button>
    </div>
  ),
}));
vi.mock('../components/juego/Confetti', () => ({
  default: () => <div>Confetti</div>,
}));
vi.mock('../components/juego/RankingPartidas', () => ({
  default: ({ ranking }: { ranking: any[] }) => (
    <div>Ranking: {ranking?.length} jugadores</div>
  ),
}));

// Mocks de axios
vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
};

describe('Juego', () => {
  beforeEach(() => {
    localStorage.setItem('partidaId', '123');
    localStorage.setItem('usuarioLogueado', 'Carlos');
    vi.clearAllMocks();
  });

  it('renderiza la pantalla inicial y maneja selección de temática', async () => {
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: [] }) // preguntas
      .mockResolvedValueOnce({ data: { puntos: 0, vidasRestantes: 3, partidaFinalizada: false } }); // estado

    render(<Juego />);
    expect(screen.getByText(/gira la ruleta/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/girar ruleta/i));

    await waitFor(() => {
      expect(screen.getByText('Modal: Cine')).toBeInTheDocument();
    });
  });

  it('carga preguntas al seleccionar temática y muestra PreguntaCard', async () => {
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: [{ enunciado: 'Pregunta 1', tipo: 'VF' }] })
      .mockResolvedValueOnce({ data: { puntos: 0, vidasRestantes: 3, partidaFinalizada: false } });

    render(<Juego />);
    fireEvent.click(screen.getByText(/girar ruleta/i));

    await act(() => new Promise((res) => setTimeout(res, 3100)));

    expect(screen.getByText('PreguntaCard')).toBeInTheDocument();
  });

  it('muestra HeaderJuego si hay estado de partida', async () => {
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: [{ enunciado: 'Pregunta 1', tipo: 'VF' }] })
      .mockResolvedValueOnce({ data: { puntos: 0, vidasRestantes: 3, partidaFinalizada: false } });

    render(<Juego />);
    fireEvent.click(screen.getByText(/girar ruleta/i));

    await waitFor(() => {
      expect(screen.getByText('HeaderJuego')).toBeInTheDocument();
    });
  });


  it('activa animaciones al responder bien o mal', async () => {
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: [{ enunciado: 'P', tipo: 'VF' }] }) // preguntas
      .mockResolvedValueOnce({ data: { puntos: 0, vidasRestantes: 3, partidaFinalizada: false } }) // estado antes
      .mockResolvedValueOnce({ data: { puntos: 100, vidasRestantes: 3, partidaFinalizada: false } }); // estado después

    mockedAxios.put = vi.fn();

    render(<Juego />);
    fireEvent.click(screen.getByText(/girar ruleta/i));

    await act(() => new Promise((res) => setTimeout(res, 3100)));

    fireEvent.click(screen.getByText('Responder Bien'));

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });
  });
});
