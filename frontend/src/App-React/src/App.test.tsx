/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./pages/Home', () => ({
  default: () => <h1>Página de Inicio</h1>,
}));
vi.mock('./pages/Login', () => ({
  default: () => <h1>Página de Login</h1>,
}));
vi.mock('./pages/Register', () => ({
  default: () => <h1>Página de Registro</h1>,
}));
vi.mock('./pages/Juego', () => ({
  default: () => <h1>Página del Juego</h1>,
}));

describe('App (Rutas)', () => {
  it('muestra la página de inicio en la ruta "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Página de Inicio' })).toBeInTheDocument();
  });

  it('muestra la página de login en la ruta "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Página de Login' })).toBeInTheDocument();
  });

  it('muestra la página de registro en la ruta "/register"', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Página de Registro' })).toBeInTheDocument();
  });

  it('muestra la página del juego en la ruta "/juego"', () => {
    render(
      <MemoryRouter initialEntries={['/juego']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Página del Juego' })).toBeInTheDocument();
  });

  it('no muestra contenido para rutas no definidas', () => {
    render(
      <MemoryRouter initialEntries={['/ruta-inexistente']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
