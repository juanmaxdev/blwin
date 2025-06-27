import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BotonSonido from './ButtonSound';

const renderConRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('BotonSonido', () => {
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve());
    pauseSpy = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    localStorage.clear();
    sessionStorage.clear();
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });
  });

  it('debe renderizar el botón y el audio', () => {
    renderConRouter(<BotonSonido />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('🔇')).toBeInTheDocument();
  });

  it('debe iniciar silenciado si localStorage tiene "false"', () => {
    localStorage.setItem('sonidoActivo', 'false');
    renderConRouter(<BotonSonido />);
    expect(screen.getByText('🔇')).toBeInTheDocument();
  });

  it('al hacer clic, cambia entre activar y desactivar sonido', () => {
    renderConRouter(<BotonSonido />);
    const boton = screen.getByRole('button');

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => false,
    });

    fireEvent.click(boton);
    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByText('🔇')).toBeInTheDocument();

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });

    fireEvent.click(boton);
    expect(playSpy).toHaveBeenCalled();
    expect(screen.getByText('🔊')).toBeInTheDocument();
  });

  it('guarda el valor en sessionStorage al cambiar sonido', () => {
    renderConRouter(<BotonSonido />);
    const boton = screen.getByRole('button');

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => false,
    });

    fireEvent.click(boton);
    expect(sessionStorage.getItem('sonidoActivo')).toBe('false');

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });

    fireEvent.click(boton);
    expect(sessionStorage.getItem('sonidoActivo')).toBe('true');
  });

  it('no reproduce sonido automáticamente si sonidoActivo es false', () => {
    sessionStorage.setItem('sonidoActivo', 'false');
    sessionStorage.setItem('musicaInicioSonando', 'false');
    renderConRouter(<BotonSonido />);
    expect(playSpy).not.toHaveBeenCalled();
  });

  it('reproduce sonido automáticamente si ya sonaba antes y sonidoActivo es true', () => {
    sessionStorage.setItem('sonidoActivo', 'true');
    sessionStorage.setItem('musicaInicioSonando', 'true');
    renderConRouter(<BotonSonido />);
    expect(playSpy).toHaveBeenCalled();
  });

  it('muestra el icono correcto y tiene accesibilidad básica', () => {
    sessionStorage.setItem('sonidoActivo', 'true');
    sessionStorage.setItem('usuarioTocoBotonSonido', 'true');

    renderConRouter(<BotonSonido />);
    const boton = screen.getByRole('button');

    expect(boton).toHaveAttribute('title', 'Silenciar música');
    expect(boton).toHaveTextContent('🔊');

    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => false,
    });

    fireEvent.click(boton);

    expect(boton).toHaveAttribute('title', 'Activar música');
    expect(boton).toHaveTextContent('🔇');
  });

  it('permite cambiar el volumen mediante el input de tipo range', () => {
    renderConRouter(<BotonSonido />);

    fireEvent.mouseEnter(screen.getByRole('button'));

    const inputVolumen = screen.getByRole('slider') as HTMLInputElement;
    expect(inputVolumen).toBeInTheDocument();
    expect(inputVolumen.value).toBe('0.5');

    fireEvent.change(inputVolumen, { target: { value: '0.3' } });

    expect(sessionStorage.getItem('volumenMusica')).toBe('0.3');
  });
});