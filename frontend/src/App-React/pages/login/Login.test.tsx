/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

vi.mock('../components/layout/HeaderWithLogo', () => ({
  default: () => <header>Mock Header</header>,
}));

vi.mock('../components/GradientCharacter', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('../components/ui/FormInput', () => ({
  default: ({ value, onChange, placeholder }: any) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={placeholder}
    />
  ),
}));

vi.mock('../components/ui/Button', () => ({
  default: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    document.title = '';
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.remove();
    vi.clearAllMocks();
  });

  it('se renderiza correctamente con campos y botón', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('muestra mensaje de error si login falla (credenciales incorrectas)', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Credenciales inválidas' }), // Esto no afecta
    });

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Carlos' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'malapass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument(); // ✅ esto sí aparece
    });
  });


  it('muestra mensaje de error si fetch falla (error de red)', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Error de red'));

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al conectar con el servidor/i)).toBeInTheDocument();
    });
  });


  it('renderiza elementos visuales como personajes y header', () => {
    renderWithRouter(<Login />);
    expect(screen.getByAltText(/personaje izquierda/i)).toBeInTheDocument();
    expect(screen.getByAltText(/personaje derecha/i)).toBeInTheDocument();
  });

  it('actualiza <head> con título y descripción', () => {
    renderWithRouter(<Login />);
    expect(document.title).toBe('Iniciar Sesión | BLWin');
    const meta = document.querySelector("meta[name='description']");
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute('content')).toBe('Página de inicio de sesión para usuarios');
  });
});
