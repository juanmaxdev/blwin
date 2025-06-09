import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useGameContext } from '../gameContext/GameContext';
import Asteroide from './Asteroide';
import '@testing-library/jest-dom';


vi.mock('../../../../assets/juegos/juego_esquivar/NPC.png', () => ({
    default: 'mocked-npc.png',
}));

vi.mock('../gameContext/GameContext', async () => {
    const actual = await vi.importActual('../gameContext/GameContext');
    return {
        ...actual,
        useGameContext: vi.fn(),
    };
});

describe('<Asteroide />', () => {
    beforeEach(() => {{}
        vi.useFakeTimers();
    });

    it('renderiza el asteroide en la posición inicial', () => {
        (useGameContext as any).mockReturnValue({ jugando: false });

        render(<Asteroide ejeX={true} fila={1} columna={2} velocidad={1000} />);
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();

        const box = img.parentElement!;
        const style = getComputedStyle(box);
        expect(style.gridColumn).toMatch(/^2\s*\/\s*3$/);
        expect(style.gridRow).toMatch(/^1\s*\/\s*2$/);
    });

    it('no se mueve si jugando es false', () => {
        (useGameContext as any).mockReturnValue({ jugando: false });

        render(<Asteroide ejeX={true} fila={1} columna={2} velocidad={500} />);

        act(() => {
            vi.advanceTimersByTime(1500);
        });

        const box = screen.getByRole('img').parentElement!;
        const style = getComputedStyle(box);
        expect(style.gridColumn).toMatch(/^2\s*\/\s*3$/);
        expect(style.gridRow).toMatch(/^1\s*\/\s*2$/);

    });

    it('se mueve con el tiempo si jugando es true', () => {
        (useGameContext as any).mockReturnValue({ jugando: true });

        render(<Asteroide ejeX={true} fila={1} columna={2} velocidad={1000} />);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const box = screen.getByRole('img').parentElement!;
        const style = getComputedStyle(box);
        expect(style.gridRow).toMatch(/^2\s*\/\s*3$/);

    });

});
