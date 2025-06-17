import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultadoPregunta from './ResultadoPregunta';

//Función que renderiza el componente
const renderComponente = (props: {
    correcta: boolean | null;
    correctaTexto: string;
    perdida: number;
    onSiguiente: () => void;
}) => {
    return render(<ResultadoPregunta {...props} />);
};

describe('ResultadoPregunta', () => {
    it('muestra mensaje correcto si la respuesta es correcta', () => {
        //Llama a la función
        renderComponente({
            correcta: true,
            correctaTexto: 'París',
            perdida: 0,
            onSiguiente: vi.fn(),
        });
        //Recoge el mensaje esperado
        const mensajeEsperado = '¡Correcto!';
        //Comprueba que se muestra
        expect(screen.getByText(mensajeEsperado)).toBeInTheDocument();
    });

    it('muestra mensaje de error si la respuesta es incorrecta', () => {
        //Llama a la función
        renderComponente({
            correcta: false,
            correctaTexto: 'París',
            perdida: 10,
            onSiguiente: vi.fn(),
        });
        //Recoge el mensaje esperado
        const mensajeEsperado = 'Incorrecto. Perdiste 10 puntos. La respuesta correcta era: "París".';
        //Comprueba que se muestra
        expect(screen.getByText(mensajeEsperado)).toBeInTheDocument();
    });

    it('llama a onSiguiente al hacer clic en el botón', () => {
        const mockOnSiguiente = vi.fn();
        //Llama a la función
        renderComponente({
            correcta: true,
            correctaTexto: 'París',
            perdida: 0,
            onSiguiente: mockOnSiguiente,
        });
        //Recoge el boton
        const boton = screen.getByRole('button', { name: /siguiente pregunta/i });
        //Hace click al boton
        fireEvent.click(boton);
        //Compruba que se llama una vez
        expect(mockOnSiguiente).toHaveBeenCalledTimes(1);
    });

    it('muestra mensaje de incorrecto cuando correcta es null', () => {
        //Llama a la función
        renderComponente({
            correcta: null,
            correctaTexto: 'París',
            perdida: 0,
            onSiguiente: vi.fn(),
        });
        //Recoge el mensaje esperado
        const mensajeEsperado = 'Incorrecto. Perdiste 0 puntos. La respuesta correcta era: "París".';
        //Comprueba que se muestra
        expect(screen.getByText(mensajeEsperado)).toBeInTheDocument();
    });
});
