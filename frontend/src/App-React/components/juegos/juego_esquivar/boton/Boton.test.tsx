import { fireEvent, render, screen } from "@testing-library/react";
import Boton from "./Boton"
import { describe, it, expect, vi} from 'vitest';
describe('Boton', () => {
    
    it('inicia con el texto descrito', () => {

        render(<Boton valor={"prueba"} />)

        expect(screen.getByText('prueba')).toBeInTheDocument();

    });

    it('lanza la función al hacer click', () => {
        const funciona = vi.fn();

        render(<Boton valor={"prueba"} funcion={funciona} />)

        const boton = screen.getByText('prueba')

        fireEvent.click(boton);

        expect(funciona).toHaveBeenCalled();
    })
})