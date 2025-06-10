import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import Nivel1 from './nivel1';

// Mock parcial del módulo react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Nivel1', () => {
    //Función de renderizar el componente
    const renderComponent = () => render(<Nivel1 />);

    //Limpiamos la sessionStorage y los mocks
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('renderiza el título, vista previa y botón de confirmar', () => {
        //Renderiza el componente
        renderComponent();
        //Obtenemos todos los elementos 
        const titulo = screen.getByRole('heading', { name: /nivel 1 - css detective/i });
        const textarea = screen.getByRole('textbox');
        const confirmacionBoton = screen.getByRole('button', { name: /confirmar/i });
        const texto = screen.getByText('Texto importante');
        //Comrpueba que todos los elementos anteriores salgan en el documento
        expect(titulo).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(confirmacionBoton).toBeInTheDocument();
        expect(texto).toBeInTheDocument();
    });

    it('valida CSS correcto, muestra mensaje de éxito, guarda en sessionStorage y navega al siguiente nivel', async () => {
        //Crear un nuevo mock
        const mockNavigate = vi.fn();
        const { useNavigate } = await import('react-router-dom');
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        renderComponent();
        //Obteiene el boton de confirmar
        const textarea = screen.getByRole('textbox');
        const boton = screen.getByRole('button', { name: /confirmar/i });
        // CSS válido
        await userEvent.clear(textarea);
        await userEvent.type(textarea, 'p {{ color: red; }}');
        //Clic al boton
        fireEvent.click(boton);
        // Verificamos que se haya guardado correctamente en sessionStorage
        expect(sessionStorage.getItem('nivel1Superado')).toBeNull;
    });
});
