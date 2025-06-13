import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import ProgressBar from './BarraProgreso';

//Mock parcial del módulo react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('BarraProgreso', () => {
    //Función auxiliar para renderizar el componente
    const renderComponent = (props = { currentStep: 1 }) => {
        return render(
            <MemoryRouter>
                <ProgressBar {...props} />
            </MemoryRouter>
        );
    };

    //Limpiamos
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    it('renderiza todos los pasos', () => {
        //Renderiza el componente
        renderComponent({ currentStep: 3 });
        //Comrpueba que la barra de progreso con los números salgan correctamente en el documento
        for (let i = 1; i <= 9; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }
    });

    it('marca como superado si sessionStorage tiene "true"', () => {
        //Marca que el nivel 2 ha sido superado
        sessionStorage.setItem('nivel2Superado', 'true');
        //Renderiza el componente
        renderComponent({ currentStep: 3 });
        // Busca el elemento del paso 2 usando el atributo title
        const div = screen.getByTitle('Ir al nivel 2');
        //Verifica que la alerta ha pasado el icono y que el nivel 2 esta marcado como superado
        expect(div.querySelector('svg')).toBeInTheDocument();
    });

    it('navega correctamente al hacer clic en un paso', async () => {
        //Crea un mock
        const mockNavigate = vi.fn();
          // Hace que useNavigate devuelva la función mock en lugar de la real

        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        //Renderiza el componente
        renderComponent({ currentStep: 1 });
        // Busca el elemento del paso 4 usando el atributo title
        const div = screen.getByTitle('Ir al nivel 4');
        //Simula un clic 
        await userEvent.click(div);
        //Verifica que se redirige al enlace 
        expect(mockNavigate).toHaveBeenCalledWith('/juego/selectores/nivel-4');
    });
});
