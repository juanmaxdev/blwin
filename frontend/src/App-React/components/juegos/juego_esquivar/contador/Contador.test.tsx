import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contador from './Contador';

describe('<Contador />', () => {
    it('debe mostrar el número de puntos', () => {
        render(<Contador puntos={10} fila={1} columna={2} />);
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('debe aplicar correctamente los estilos de grid', () => {
        const { container } = render(<Contador puntos={5} fila={3} columna={4} />);
        const wrapper = container.firstChild as HTMLElement;

        const style = getComputedStyle(wrapper);
        expect(style.gridColumn).toMatch(/^4\s*\/\s*5$/);
        expect(style.gridRow).toMatch(/^3\s*\/\s*4$/);
    });
});
