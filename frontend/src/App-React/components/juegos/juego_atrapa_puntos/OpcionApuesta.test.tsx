import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OpcionApuesta from './OpcionApuesta';
describe('OpcionApuesta', () => {
    // Proppiedades por defectoi
    const defectoPropiedades = {
        indice: 1,
        valor: 5,
        cambiarValor: vi.fn(),
        deshabilitado: false,
        correcta: false,
        seleccionada: false,
        respondido: false,
        texto: 'Opción A',
        puntos: 20,
    };

    it('muestra el texto de la opción', () => {
        //Renderiza el componente
        render(<OpcionApuesta {...defectoPropiedades} />);
        //Comprueba que se muestre 
        expect(screen.getByText('Opción A')).toBeInTheDocument();
    });

    it('muestra el valor correcto en el input', () => {
        // Renderiza el componente
        render(<OpcionApuesta {...defectoPropiedades} />);
        // Busca el input de tipo number
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        // Verifica que el valor sea 5 
        expect(input.value).toBe('5');
    });

    it('llama a cambiarValor al cambiar el input', () => {
        // Crea una función simulada (mock)  
        const cambiarValorMock = vi.fn();
        //Renderiza el componente
        render(<OpcionApuesta {...defectoPropiedades} cambiarValor={cambiarValorMock} />);
        // Simula que el usuario escribe "10" en el input
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '10' } });
        // Verifica que la función se llamó con el índice correcto y el nuevo valor
        expect(cambiarValorMock).toHaveBeenCalledWith(1, 10);
    });

    it('deshabilita el input si deshabilitado es true', () => {
        //Renderiza el componente
        render(<OpcionApuesta {...defectoPropiedades} deshabilitado={true} />);
        // Verifica que el input esté deshabilitado        
        const input = screen.getByRole('spinbutton');
        expect(input).toBeDisabled();
    });

    it('aplica clase verde si respondido y es correcta', () => {
        //Renderiza el componente
        render(<OpcionApuesta {...defectoPropiedades} respondido={true} correcta={true} />);
        // Verifica que el texto tenga la clase verde que indica respuesta correcta
        const option = screen.getByText('Opción A');
        expect(option).toHaveClass('text-green-700');
    });

    it('aplica clase roja si respondido y era seleccionada pero incorrecta', () => {
        // Renderiza la opción como respondida, seleccionada por el usuario, pero incorrecta
        render(
            <OpcionApuesta
                {...defectoPropiedades}
                respondido={true}
                correcta={false}
                seleccionada={true}
            />
        );
        // Toma el contenedor principal que tiene el fondo de color
        const container = screen.getByText('Opción A').parentElement;
        // Verifica que tenga la clase que indica respuesta incorrecta seleccionada
        expect(container?.className).toContain('bg-red-100');
    });
});
