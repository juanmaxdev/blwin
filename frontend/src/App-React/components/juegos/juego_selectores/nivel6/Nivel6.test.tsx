import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

import Nivel6 from './nivel6';

// Mock confetti
vi.mock('canvas-confetti', () => ({
    default: vi.fn(() => Promise.resolve()),
}));

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Nivel6', () => {
    //Función para renderizar el componente
    const renderComponent = () => render(<Nivel6 />);

    // Mock global de CSS.supports 
    beforeAll(() => {
        global.CSS ??= {} as any;
        global.CSS.supports = vi.fn().mockReturnValue(true);
    });

    //Limpiamos los mocks y la sessionStorage
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('renderiza correctamente los elementos clave', () => {
        //Llamamos a la función 
        renderComponent();
        //Obtenemos todos los elementos
        const titulo = screen.getByRole('heading', { name: /nivel 6 - css detective/i });
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        //Comprobamos que todos los elementos anteriores se encuentren en el documento
        expect(titulo).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(boton).toBeInTheDocument();
    });

    it('valida CSS correcto, muestra mensaje de éxito y guarda en sessionStorage', async () => {
        //Llamamos a la función 
        renderComponent();
        //Obtenemos todos los elementos
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        //El css correcto de este nivel (se le pone dos {{ }} debido a que si le pones {} es otra función del vitest)                
        const cssValido = `
        li:first-child {{
            font-weight: bold;
        }}`;
        //Limpiamos el textarea y le añadimos el css correcto
        await userEvent.clear(textarea);
        await userEvent.type(textarea, cssValido);
        //Le damos clic al botón
        fireEvent.click(boton);
        //Mensaje de éxito y que se pone true como nivel completado en el storage        
        await waitFor(() => {
            expect(screen.getByText(/¡perfecto! estilo aplicado correctamente/i)).toBeInTheDocument();
            expect(sessionStorage.getItem('nivel6Superado')).toBe('true');
        });
    });
});
