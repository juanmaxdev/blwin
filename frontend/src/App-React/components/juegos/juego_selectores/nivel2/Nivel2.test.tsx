import { render, screen, cleanup} from '@testing-library/react';
import { describe, it, vi, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import Nivel2 from './nivel2';

// Mock parcial del módulo react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Nivel2', () => {
    //Función de renderizar el componente
    const renderComponent = () => render(<Nivel2 />);

    //Limpiamos la sessionStorage y los mocks
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('renderiza correctamente los elementos clave de la interfaz', () => {
        //Renderiza el componente
        renderComponent();
        //Obtenemos los elementos principales
        const titulo = screen.getByRole('heading', { name: /nivel 2 - css detective/i });
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        //Verificamos que estén en el documento
        expect(titulo).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(boton).toBeInTheDocument();
    });
});
