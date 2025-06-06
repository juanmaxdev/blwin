// src/App-React/components/juegos/ahorcado/modalFin/modalSubirNivel/modalNivel.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ModalSubidaNivel from './modalNivel';

vi.mock('../../../../../assets/juegos/ahorcado/modelo/gif-murcielago.gif', () => ({
  default: 'mocked-gif.gif',
}));

describe('<ModalSubidaNivel />', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    onCloseMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('no renderiza nada cuando isOpen es false', () => {
    render(<ModalSubidaNivel isOpen={false} puntuacion={200} nivel={2} onClose={onCloseMock} />);

    expect(screen.queryByText(/¡SUBES AL NIVEL/)).toBeNull();
    expect(screen.queryByText(/Tu puntuación actual es de/)).toBeNull();
  });

  it('renderiza el modal con nivel, puntuación e imágenes cuando isOpen es true', () => {
    render(<ModalSubidaNivel isOpen={true} puntuacion={350} nivel={3} onClose={onCloseMock} />);

    // Encabezado con texto parcial "¡SUBES AL NIVEL"
    expect(screen.getByText(/¡SUBES AL NIVEL/)).toBeInTheDocument();
    // Número de nivel "3"
    expect(screen.getByText('3')).toBeInTheDocument();

    // Texto de puntuación
    expect(screen.getByText(/Tu puntuación actual es de/)).toBeInTheDocument();
    expect(screen.getByText('350')).toBeInTheDocument();

    // Debe haber dos imágenes con alt "Murciélago animado"
    const imgs = screen.getAllByRole('img', { name: /Murciélago animado/i });
    expect(imgs).toHaveLength(2);
  });

  it('llama a onClose automáticamente después de 3 segundos', () => {
    render(<ModalSubidaNivel isOpen={true} puntuacion={120} nivel={2} onClose={onCloseMock} />);

    expect(onCloseMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
