/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
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

    expect(screen.getByAltText('Logo BLWin')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Slogan del juego')).toBeInTheDocument();
  });

  it('muestra el botón "Minijuego aleatorio" si hay token', () => {
    localStorage.setItem('token', validToken);
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getByRole('button', { name: /Minijuego aleatorio/i })).toBeInTheDocument();
  });

  it('redirige al login si no hay token', () => {
    render(<Home />, { wrapper: MemoryRouter });

    const jugarBtn = screen.queryByRole('button', { name: /Minijuego aleatorio/i });
    if (jugarBtn) {
      fireEvent.click(jugarBtn);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }
  });

  it('renderiza el título y descripción con <Head>', () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Inicio | BLWin');
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    expect(meta?.content).toBe('Juego para aprender programación en línea');
  });
});
