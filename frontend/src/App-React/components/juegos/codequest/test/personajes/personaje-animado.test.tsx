import { render, screen, act } from '@testing-library/react';
import PersonajeAnimado from '../../../codequest/personajes/personaje-animado';
import ImagenPersonaje from '../../../../../assets/juegos/codequest/personaje/personaje_principal_back.png'
import { vi } from 'vitest'

describe('Componente PersonajeAnimado', () => {
  const urlImagenPrueba = ImagenPersonaje;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renderiza con animación idle por defecto', () => {
    render(<PersonajeAnimado imagen={urlImagenPrueba} />);
    const contenedor = screen.getByRole('img', { name: /personaje/i }).parentElement;
    expect(contenedor).toHaveClass('w-64', 'h-64', 'animate-bounce-slow');
  });

  it('aplica animación attack y luego vuelve a idle tras 1s', () => {

    render(<PersonajeAnimado imagen={urlImagenPrueba} animacion="attack" />);
    const contenedor = screen.getByRole('img', { name: /personaje/i }).parentElement;

    // Al iniciar, clase de ataque
    expect(contenedor).toHaveClass('animate-pulse');

    // Tras 1000ms vuelve a idle
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(contenedor).toHaveClass('animate-bounce-slow');
  });

  it('aplica animación damage y luego vuelve a idle tras 1s', () => {
    render(
      <PersonajeAnimado imagen={urlImagenPrueba} animacion="damage" />
    );
    const contenedor = screen.getByRole('img', { name: /personaje/i }).parentElement;

    // Al iniciar, clase de daño
    expect(contenedor).toHaveClass('animate-shake');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(contenedor).toHaveClass('animate-bounce-slow');
  });

  it('acepta clase personalizada y mantiene animación', () => {
    render(
      <PersonajeAnimado imagen={urlImagenPrueba} className="mi-clase" animacion="idle" />
    );
    const contenedor = screen.getByRole('img', { name: /personaje/i }).parentElement;
    expect(contenedor).toHaveClass('mi-clase', 'animate-bounce-slow');
  });
});
