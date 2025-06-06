import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

import Nivel9 from './Nivel9';

// Mock de canvas-confetti para evitar errores en JSDOM
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

// Mock global de CSS.supports 
beforeAll(() => {
    global.CSS ??= {} as any;
    global.CSS.supports = vi.fn().mockReturnValue(true);
});

describe('Nivel9', () => {
    //Función para renderizar el componente
    const renderComponent = () => render(<Nivel9 />);
    
    //Limpiamos los mocks y la sessionStorage
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('renderiza correctamente los elementos clave', () => {
        //Llama a la función que renderiza al componente
        renderComponent();
        //Obtenemos todos los elementos
        const titulo = screen.getByRole('heading', { name: /nivel 9 - css detective/i });
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        //Comprobamos quer todos los elementos anteriores salen en el documento
        expect(titulo).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(boton).toBeInTheDocument();

    });

    it('valida CSS correcto, muestra mensaje de éxito y guarda en sessionStorage', async () => {
        //Llama a la función que renderiza al componente
        renderComponent();
        //Obtiene los elementos textarea y el boton
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        //El css correcto de este nivel ( se le pone dos {{ }} debido a que si le pones {} es otra función del vitest)
        const cssCorrecto = `
        section div > p:first-child {{
            text-transform: uppercase;
            letter-spacing: 2px;
        }}`;
        //Le asigna al textarea el css correcto
        await userEvent.clear(textarea);
        await userEvent.type(textarea, cssCorrecto);
        //Le da clic al boton
        fireEvent.click(boton);
        // Verifica mensaje de éxito
        await screen.findByText(/¡perfecto! estilo aplicado correctamente/i);
        // Verifica que sessionStorage esté actualizado
        expect(sessionStorage.getItem('nivel9Superado')).toBe('true');
    });
});
