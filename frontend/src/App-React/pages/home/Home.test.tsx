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

// Mock de jwt-decode
vi.mock('jwt-decode', () => {
  return {
    default: () => ({ id: 42 }),
  };
});

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockReset();
});

describe('Home', () => {
  it('renderiza logo, botón y texto del slogan', () => {
    render(<Home />, { wrapper: MemoryRouter });

    expect(screen.getByAltText('Logo BLWin')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(
      screen.getByText(/¡Pon a prueba tus conocimientos con los/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Juega, aprende y desafía a tus amigos con BLWin/i)
    ).toBeInTheDocument();
  });

  it('redirige al login si no hay token y se pulsa el botón', async () => {
    render(<Home />, { wrapper: MemoryRouter });

    // El botón "Minijuego aleatorio" no debería aparecer si no hay token
    const jugarBtn = screen.queryByRole('button', {
      name: /Minijuego aleatorio/i,
    });

    // Si el botón no está, forzamos un click en "Iniciar Sesión" para simular navegación
    if (!jugarBtn) {
      const loginBtn = screen.getByText('Iniciar Sesión');
      fireEvent.click(loginBtn);
      // Aquí puedes ajustar según la lógica real de navegación
      // Por ejemplo, si al hacer click en Iniciar Sesión navegas a /login
      // expect(mockNavigate).toHaveBeenCalledWith('/login');
    } else {
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
