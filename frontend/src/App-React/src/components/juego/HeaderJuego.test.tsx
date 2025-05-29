/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import HeaderJuego from './HeaderJuego';

describe('HeaderJuego', () => {
  const defaultProps = {
    puntos: 300,
    vidas: 2,
    usuarioNombre: 'Jugador1',
    animacionPuntos: false,
    animacionVida: false,
  };

  it('muestra los puntos correctamente', () => {
    render(<HeaderJuego {...defaultProps} />);
    expect(screen.getByText('Puntos:')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.puntos)).toBeInTheDocument();
  });

  it('muestra el nombre del usuario', () => {
    render(<HeaderJuego {...defaultProps} />);
    expect(screen.getByText('Jugador1')).toBeInTheDocument();
  });

  it('renderiza 3 corazones en total', () => {
    render(<HeaderJuego {...defaultProps} />);
    const corazones = screen.getAllByText(/❤️|💔/);
    expect(corazones).toHaveLength(3);
  });

  it('renderiza correctamente vidas activas e inactivas', () => {
    render(<HeaderJuego {...defaultProps} />);
    const activos = screen.getAllByText('❤️');
    const perdidos = screen.getAllByText('💔');

    expect(activos).toHaveLength(2);
    expect(perdidos).toHaveLength(1);
  });

  it('no muestra el nombre si usuarioNombre es null', () => {
    render(
      <HeaderJuego
        {...defaultProps}
        usuarioNombre={null}
      />
    );
    expect(screen.queryByText('Jugador1')).not.toBeInTheDocument();
  });
});
