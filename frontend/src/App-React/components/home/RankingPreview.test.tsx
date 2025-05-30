/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import RankingPreview, { RankingItem } from './RankingPreview';

const mockRanking: RankingItem[] = [
  { posicion: 1, nombreUsuario: 'Ana', puntos: 500 },
  { posicion: 2, nombreUsuario: 'Luis', puntos: 450 },
  { posicion: 3, nombreUsuario: 'Marta', puntos: 420 },
];

describe('RankingPreview', () => {
  it('no renderiza si el ranking está vacío', () => {
    const { container } = render(<RankingPreview ranking={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('muestra correctamente el título del ranking', () => {
    render(<RankingPreview ranking={mockRanking} />);
    expect(screen.getByText(/top 5 del ranking/i)).toBeInTheDocument();
  });

  it('renderiza cada elemento del ranking', () => {
    render(<RankingPreview ranking={mockRanking} />);
    mockRanking.forEach((item) => {
      expect(screen.getByText(item.nombreUsuario)).toBeInTheDocument();
      expect(screen.getByText(`${item.puntos} pts`)).toBeInTheDocument();
    });
  });

  it('muestra la posición correctamente', () => {
    render(<RankingPreview ranking={mockRanking} />);
    mockRanking.forEach((item) => {
      expect(screen.getByText(item.posicion.toString())).toBeInTheDocument();
    });
  });
});
