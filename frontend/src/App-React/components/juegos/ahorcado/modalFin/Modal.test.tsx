// src/components/ModalGameOver.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalGameOver from './Modal';

describe('<ModalGameOver />', () => {
  let irInicioMock: () => void;
  let volverAempezarMock: () => void;

  beforeEach(() => {
    irInicioMock = vi.fn();
    volverAempezarMock = vi.fn();
  });

  it('no renderiza nada cuando isOpen es false', () => {
    render(
      <ModalGameOver
        isOpen={false}
        puntuacion={123}
        irInicio={irInicioMock}
        volverAempezar={volverAempezarMock}
      />
    );
    // No debe mostrar el texto "¡Partida Terminada!"
    expect(screen.queryByText(/¡Partida Terminada!/i)).toBeNull();
    // Tampoco debe renderizar botones
    expect(screen.queryByRole('button', { name: /Volver al inicio/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /Volver a jugar/i })).toBeNull();
  });

  it('renderiza título, puntuación y botones cuando isOpen es true', () => {
    render(
      <ModalGameOver
        isOpen={true}
        puntuacion={456}
        irInicio={irInicioMock}
        volverAempezar={volverAempezarMock}
      />
    );

    // Título "¡Partida Terminada!"
    expect(screen.getByText(/¡Partida Terminada!/i)).toBeInTheDocument();

    // Texto de puntuación con "456"
    expect(screen.getByText(/Tu puntuación es/i)).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();

    // Botón "Volver al inicio"
    const btnInicio = screen.getByRole('button', { name: /Volver al inicio/i });
    expect(btnInicio).toBeInTheDocument();

    // Botón "Volver a jugar"
    const btnReiniciar = screen.getByRole('button', { name: /Volver a jugar/i });
    expect(btnReiniciar).toBeInTheDocument();
  });

  it('al hacer clic en "Volver al inicio" llama a irInicio', () => {
    render(
      <ModalGameOver
        isOpen={true}
        puntuacion={789}
        irInicio={irInicioMock}
        volverAempezar={volverAempezarMock}
      />
    );

    const btnInicio = screen.getByRole('button', { name: /Volver al inicio/i });
    fireEvent.click(btnInicio);
    expect(irInicioMock).toHaveBeenCalledTimes(1);
  });

  it('al hacer clic en "Volver a jugar" llama a volverAempezar', () => {
    render(
      <ModalGameOver
        isOpen={true}
        puntuacion={789}
        irInicio={irInicioMock}
        volverAempezar={volverAempezarMock}
      />
    );

    const btnReiniciar = screen.getByRole('button', { name: /Volver a jugar/i });
    fireEvent.click(btnReiniciar);
    expect(volverAempezarMock).toHaveBeenCalledTimes(1);
  });
});
