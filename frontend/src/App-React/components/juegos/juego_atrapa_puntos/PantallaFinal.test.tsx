import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PantallaFinal from './PantallaFinal';

describe('PantallaFinal', () => {
  // Propiedades base reutilizables
  const baseProps = {
    reiniciar: vi.fn(),
    puntajeFinal: 1500,
  };

  it('muestra mensaje de fin de juego por respuesta incorrecta', () => {
    // Renderiza el componente con finJuego en true
    render(
      <PantallaFinal
        {...baseProps}
        etapa="3"
        finJuego={true}
        todasCorrectas={false}
      />
    );
    // Verifica que se muestre el mensaje de error por respuesta incorrecta
    expect(screen.getByText(/respuesta incorrecta. fin del juego/i)).toBeInTheDocument();
  });

  it('muestra mensaje de juego completado sin todas correctas', () => {
    // Renderiza el componente con etapa final y sin todas correctas
    render(
      <PantallaFinal
        {...baseProps}
        etapa="final"
        finJuego={false}
        todasCorrectas={false}
      />
    );
    // Verifica que se muestre el mensaje de que se completó el juego
    expect(screen.getByText(/¡completaste todas las etapas!/i)).toBeInTheDocument();
    // Verifica que se muestre el puntaje final
    expect(screen.getByText(/has ganado/i)).toHaveTextContent('Has ganado 1500 puntos');
  });

  it('muestra mensaje de todas correctas y duplicación', () => {
    // Renderiza el componente con todasCorrectas en true
    render(
      <PantallaFinal
        {...baseProps}
        etapa="final"
        finJuego={false}
        todasCorrectas={true}
      />
    );
    // Verifica que se muestre el mensaje de bonificación por todas correctas
    expect(screen.getByText(/¡respondiste todas las preguntas correctamente!/i)).toBeInTheDocument();
    // Verifica que se muestre el puntaje final
    expect(screen.getByText(/has ganado/i)).toHaveTextContent('Has ganado 1500 puntos');
  });

  it('muestra mensaje genérico si no hay preguntas ni fin por error', () => {
    // Renderiza el componente con etapa 2, sin finJuego ni todas correctas
    render(
      <PantallaFinal
        {...baseProps}
        etapa="2"
        finJuego={false}
        todasCorrectas={false}
      />
    );
    // Verifica que se muestre el mensaje genérico de cierre
    expect(screen.getByText(/no quedan más preguntas/i)).toBeInTheDocument();
  });
});
