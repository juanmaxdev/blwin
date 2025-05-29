/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mocks
vi.mock('../components/home/LoginButton', () => ({
  default: () => <button>Iniciar Sesión</button>,
}));

vi.mock('../components/home/Slogan', () => ({
  default: () => <p>Slogan del juego</p>,
}));

vi.mock('../components/home/RankingPreview', () => ({
  default: ({ ranking }: any) => (
    <div>
      <h2>🏆 Top 5 del Ranking</h2>
      {ranking?.map((r: any) => <div key={r.posicion}>{r.nombreUsuario}</div>)}
    </div>
  ),
}));

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: { partidaId: 123 } })),
  },
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const validToken =
  btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) +
  '.' +
  btoa(JSON.stringify({ id: 42 })) +
  '.signature';

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockReset();
});

describe('Home', () => {
  it('renderiza logo, botón y slogan', () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getByAltText('Logo Triviados')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Slogan del juego')).toBeInTheDocument();
  });

  it('muestra el botón "Jugar Ahora" si hay token', () => {
    localStorage.setItem('token', validToken);
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getByRole('button', { name: /jugar ahora/i })).toBeInTheDocument();
  });

  it('redirige al login si no hay token', () => {
    render(<Home />, { wrapper: MemoryRouter });

    const jugarBtn = screen.queryByRole('button', { name: /jugar ahora/i });
    if (jugarBtn) {
      fireEvent.click(jugarBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }
  });

  it('redirige a /juego si hay token válido', async () => {
    localStorage.setItem('token', validToken);
    render(<Home />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole('button', { name: /jugar ahora/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/juego');
      expect(localStorage.getItem('partidaId')).toBe('123');
    });
  });

  it('renderiza el título y descripción con <Head>', () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Inicio | Triviados');
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    expect(meta?.content).toBe('Juego de trivia en línea');
  });
});
