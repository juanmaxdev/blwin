// puertas.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Puertas from '../../../escenarios/puertas/puertas';
import type { PreguntaPuerta } from '../../../escenarios/puertas/puertas';

const preguntasMock: PreguntaPuerta[] = [
  {
    id: 1,
    pregunta: '¿Pregunta fácil?',
    opcionesRespuesta: { a: 'A', b: 'B' },
    respuestaCorrecta: 'a',
    dificultad: 'facil',
  },
  {
    id: 2,
    pregunta: '¿Pregunta media?',
    opcionesRespuesta: { a: 'A', b: 'B' },
    respuestaCorrecta: 'b',
    dificultad: 'media',
  },
  {
    id: 3,
    pregunta: '¿Pregunta difícil?',
    opcionesRespuesta: { a: 'A', b: 'B' },
    respuestaCorrecta: 'a',
    dificultad: 'dificil',
  },
];

describe('Puertas', () => {
  const imagenCerrada = 'cerrada.png';
  const imagenAbierta = 'abierta.png';
  const mockOnSeleccion = vi.fn();

  beforeEach(() => {
    vi.useRealTimers();
    mockOnSeleccion.mockClear();
  });

  it('renderiza todas las puertas y el mensaje informativo', () => {
    render(
      <Puertas
        onSeleccionPuerta={mockOnSeleccion}
        preguntas={preguntasMock}
        imagenPuertaCerrada={imagenCerrada}
        imagenPuertaAbierta={imagenAbierta}
      />
    );

    expect(screen.getByText(/elige una puerta/i)).toBeInTheDocument();
    expect(screen.getByAltText(/puerta fácil/i)).toBeInTheDocument();
    expect(screen.getByAltText(/puerta media/i)).toBeInTheDocument();
    expect(screen.getByAltText(/puerta difícil/i)).toBeInTheDocument();
  });

  it('selecciona la puerta correcta y llama a onSeleccionPuerta con pregunta', async () => {
    render(
      <Puertas
        onSeleccionPuerta={mockOnSeleccion}
        preguntas={preguntasMock}
        imagenPuertaCerrada={imagenCerrada}
        imagenPuertaAbierta={imagenAbierta}
      />
    );

    const puertaFacil = screen.getByAltText(/puerta fácil/i);
    fireEvent.click(puertaFacil);

    await waitFor(
      () => {
        expect(mockOnSeleccion).toHaveBeenCalledWith('facil', expect.objectContaining({ dificultad: 'facil' }));
      },
      { timeout: 3000 }
    );
  });
});
