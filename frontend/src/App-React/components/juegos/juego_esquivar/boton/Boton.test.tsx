import { fireEvent, render, screen } from "@testing-library/react";
import Boton from "./Boton"
import { describe, it, expect, vi } from 'vitest';
describe('Boton', () => {

    it('inicia con el texto descrito', () => {

        render(<Boton valor={"prueba"} fila={0} columna={0} />)

        expect(screen.getByText('prueba')).toBeInTheDocument();

    });

    it('lanza la función al hacer click', () => {
        const funciona = vi.fn();

        render(<Boton valor={"prueba"} funcion={funciona} fila={0} columna={0} />)

        const boton = screen.getByText('prueba')

        fireEvent.click(boton);

        expect(funciona).toHaveBeenCalled();
    });

    it('debe aplicar correctamente los estilos de grid', () => {
        const { container } = render(<Boton valor={"prueba"} fila={3} columna={4} />);
        const wrapper = container.firstChild as HTMLElement;

        const style = getComputedStyle(wrapper);
        expect(style.gridColumn).toMatch(/^4\s*\/\s*5$/);
        expect(style.gridRow).toMatch(/^3\s*\/\s*4$/);
    });
})