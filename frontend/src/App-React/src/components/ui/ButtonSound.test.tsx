import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BotonSonido from './ButtonSound';

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
    // Restaurar estado "pausado" por defecto
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });
  });

  it('debe renderizar el botón y el audio', () => {
    render(<BotonSonido />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('🔇')).toBeInTheDocument();
  });

  it('debe iniciar silenciado si localStorage tiene "false"', () => {
    localStorage.setItem('sonidoActivo', 'false');
    render(<BotonSonido />);
    expect(screen.getByText('🔇')).toBeInTheDocument();
  });

  it('al hacer clic, cambia entre activar y desactivar sonido', () => {
    render(<BotonSonido />);
    const boton = screen.getByRole('button');

    // Simula audio sonando
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => false,
    });

    // Clic para desactivar
    fireEvent.click(boton);
    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByText('🔇')).toBeInTheDocument();

    // Simula audio pausado
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });

    // Clic para activar
    fireEvent.click(boton);
    expect(playSpy).toHaveBeenCalled();
    expect(screen.getByText('🔊')).toBeInTheDocument();
  });

  it('guarda el valor en sessionStorage al cambiar sonido', () => {
    render(<BotonSonido />);
    const boton = screen.getByRole('button');

    // Simula audio sonando
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => false,
    });

    fireEvent.click(boton); // desactivar
    expect(sessionStorage.getItem('sonidoActivo')).toBe('false');

    // Simula audio pausado
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get: () => true,
    });

    fireEvent.click(boton); // activar
    expect(sessionStorage.getItem('sonidoActivo')).toBe('true');
  });

  it('no reproduce sonido automáticamente si sonidoActivo es false', () => {
    sessionStorage.setItem('sonidoActivo', 'false');
    sessionStorage.setItem('musicaInicioSonando', 'false');
    render(<BotonSonido />);
    expect(playSpy).not.toHaveBeenCalled();
  });

  it('reproduce sonido automáticamente si ya sonaba antes y sonidoActivo es true', () => {
    sessionStorage.setItem('sonidoActivo', 'true');
    sessionStorage.setItem('musicaInicioSonando', 'true');
    render(<BotonSonido />);
    expect(playSpy).toHaveBeenCalled();
  });

  it('muestra el icono correcto y tiene accesibilidad básica', () => {
  sessionStorage.setItem('sonidoActivo', 'true');
  sessionStorage.setItem('usuarioTocoBotonSonido', 'true');

  render(<BotonSonido />);
  const boton = screen.getByRole('button');

  expect(boton).toHaveAttribute('title', 'Silenciar música');
  expect(boton).toHaveTextContent('🔊');

  // Simula clic para desactivar
  Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    configurable: true,
    get: () => false,
  });

  fireEvent.click(boton);

  expect(boton).toHaveAttribute('title', 'Activar música');
  expect(boton).toHaveTextContent('🔇');
});

  it('permite cambiar el volumen mediante el input de tipo range', () => {
  render(<BotonSonido />);

  // Simula que el usuario pasa el ratón por encima para mostrar el control
  fireEvent.mouseEnter(screen.getByRole('button'));

  // Ahora debería estar visible el input de volumen
  const inputVolumen = screen.getByRole('slider') as HTMLInputElement;

  expect(inputVolumen).toBeInTheDocument();
  expect(inputVolumen.value).toBe('0.5'); // Valor inicial

  fireEvent.change(inputVolumen, { target: { value: '0.3' } });

  // Verifica que el valor se haya guardado en localStorage
  expect(sessionStorage.getItem('volumenMusica')).toBe('0.3');
});
});
