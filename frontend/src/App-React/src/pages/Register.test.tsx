/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

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

describe('Register', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
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

  it('hace fetch y muestra mensaje de éxito si las contraseñas coinciden', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('Usuario registrado con éxito'),
    });

    renderWithRouter(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), {
      target: { value: 'Carlos' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'abc123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), {
      target: { value: 'abc123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/usuario registrado con éxito/i)).toBeInTheDocument();
    });
  });

  it('muestra error si fetch falla por red', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Falló'));

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

  it('muestra error si fetch responde con error del servidor', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Usuario ya existe'),
    });

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

    await waitFor(() => {
      expect(screen.getByText(/error al registrar/i)).toBeInTheDocument();
    });
  });

  it('incluye un enlace a la página de login', () => {
    renderWithRouter(<Register />);
    const link = screen.getByRole('link', { name: /inicia sesión/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renderiza los personajes decorativos (mock)', () => {
    renderWithRouter(<Register />);
    expect(screen.getByAltText('Personaje Registro Izquierda')).toBeInTheDocument();
    expect(screen.getByAltText('Personaje Registro Derecha')).toBeInTheDocument();
  });

  it('actualiza el título del documento con Head', () => {
    renderWithRouter(<Register />);
    expect(document.title).toBe('Registro | Triviados');
  });

  it('añade una meta descripción al documento con Head', () => {
    renderWithRouter(<Register />);
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('Crea tu cuenta en Triviados');
  });
});
