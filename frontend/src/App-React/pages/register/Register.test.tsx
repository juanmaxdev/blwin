/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

vi.mock('../components/layout/HeaderWithLogo', () => ({
  default: () => <header>Mock Header</header>,
}));

vi.mock('../components/GradientCharacter', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('../components/ui/FormInput', () => ({
  default: ({ value, onChange, placeholder }: any) => (
    <input
      value={value}
      placeholder={placeholder}
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

const mockRegisterPost = vi.fn();
const mockLoginPost = vi.fn();

vi.mock('../hooks/Register', () => ({
  registerPost: (...args: any[]) => mockRegisterPost(...args),
}));

vi.mock('../hooks/Login', () => ({
  loginPost: (...args: any[]) => mockLoginPost(...args),
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Register', () => {
  beforeEach(() => {
    mockRegisterPost.mockReset();
    mockLoginPost.mockReset();
    mockedNavigate.mockReset();
    document.title = '';
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.remove();
  });

  it('se renderiza correctamente con título y campos', () => {
    renderWithRouter(<Register />);
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('muestra error si las contraseñas no coinciden', () => {
    renderWithRouter(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Carlos' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: '456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });


  it('muestra error si registerPost devuelve false', async () => {
    mockRegisterPost.mockResolvedValueOnce(false);

    renderWithRouter(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Pepe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    waitFor(() => {
      expect(screen.getByText(/error al registrar/i)).toBeInTheDocument();
    });
  });

  it('muestra error si registerPost lanza excepción', async () => {
    mockRegisterPost.mockRejectedValueOnce(new Error('Falló'));

    renderWithRouter(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'abc123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: 'abc123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al conectar con el servidor/i)).toBeInTheDocument();
    });
  });

  it('incluye un enlace a la página de login', () => {
    renderWithRouter(<Register />);
    const link = screen.getByRole('link', { name: /inicia sesión/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renderiza los personajes decorativos', () => {
    renderWithRouter(<Register />);
    expect(screen.getByAltText('Personaje Registro Izquierda')).toBeInTheDocument();
    expect(screen.getByAltText('Personaje Registro Derecha')).toBeInTheDocument();
  });

  it('actualiza el título del documento con Head', () => {
    renderWithRouter(<Register />);
    expect(document.title).toBe('Registro | BLWin');
  });

  it('añade una meta descripción al documento con Head', () => {
    renderWithRouter(<Register />);
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('Crea tu cuenta en BLWin');
  });
});
