/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import LoginButton from './LoginButton';

// Utilidad para renderizar con router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock de navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginButton', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('muestra el botón de "Iniciar Sesión" si no hay usuario', () => {
    renderWithRouter(<LoginButton />);
    const link = screen.getByRole('link', { name: /iniciar sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('muestra el nombre del usuario y botón de logout si está logueado', () => {
    localStorage.setItem('usuarioLogueado', 'Juanito');
    renderWithRouter(<LoginButton />);
    expect(screen.getByText('Juanito')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  it('al hacer logout elimina datos y redirige', () => {
    localStorage.setItem('usuarioLogueado', 'Ana');
    localStorage.setItem('token', '123');
    localStorage.setItem('partidaId', '456');

    renderWithRouter(<LoginButton />);
    const button = screen.getByRole('button', { name: /cerrar sesión/i });
    fireEvent.click(button);

    expect(localStorage.getItem('usuarioLogueado')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('partidaId')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('el contenedor tiene las clases de posición esperadas', () => {
    const { container } = renderWithRouter(<LoginButton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('absolute', 'top-6', 'right-6', 'z-20');
  });
});
