import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListaPalabras from './ListaPalabras';

type EntradaPalabra = {
    palabra: string;
    pista: string;
};

describe('ListaPalabras', () => {
    const entradas: EntradaPalabra[] = [
        { palabra: 'perro', pista: 'Animal doméstico' },
        { palabra: 'gato', pista: 'Felino doméstico' },
        { palabra: 'casa', pista: 'Lugar para vivir' },
    ];

    it('renderiza todas las pistas', () => {
        render(<ListaPalabras entradas={entradas} palabrasEncontradas={[]} />);
        entradas.forEach(({ pista }) => {
            expect(screen.getByText(pista)).toBeInTheDocument();
        });
    });

    it('aplica estilos a palabras encontradas', () => {
        const palabrasEncontradas = ['gato', 'casa'];
        render(<ListaPalabras entradas={entradas} palabrasEncontradas={palabrasEncontradas} />);

        const pistaGato = screen.getByText('Felino doméstico');
        expect(pistaGato).toHaveStyle('text-decoration: line-through');
        expect(pistaGato).toHaveStyle('color: rgb(0, 128, 0)'); // green en rgb
        expect(pistaGato).toHaveStyle('font-weight: bold');

        const pistaCasa = screen.getByText('Lugar para vivir');
        expect(pistaCasa).toHaveStyle('text-decoration: line-through');
        expect(pistaCasa).toHaveStyle('color: rgb(0, 128, 0)');
        expect(pistaCasa).toHaveStyle('font-weight: bold');

        const pistaPerro = screen.getByText('Animal doméstico');
        expect(pistaPerro).toHaveStyle('text-decoration: none');
        expect(pistaPerro).toHaveStyle('color: rgb(0, 0, 0)'); // black en rgb
        expect(pistaPerro).toHaveStyle('font-weight: normal');
    });
});
