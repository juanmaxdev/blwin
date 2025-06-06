import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nave from './Nave';

vi.mock('../../../../assets/juegos/juego_esquivar/PJ.png', () => ({
    default: 'mocked-image.png',
}));

describe('<Nave />', () => {
    it('debe mostrar la imagen con el alt correcto', () => {
        render(<Nave fila={2} columna={3} />);
        const img = screen.getByAltText('Imagen de una nave');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'mocked-image.png');
    });

    it('debe aplicar correctamente los estilos de grid', () => {
        const { container } = render(<Nave fila={3} columna={4} />);
        const box = container.firstChild as HTMLElement;

        const style = getComputedStyle(box);
        expect(style.gridColumn).toMatch(/^4\s*\/\s*5$/);
        expect(style.gridRow).toMatch(/^3\s*\/\s*4$/);

    });
});
