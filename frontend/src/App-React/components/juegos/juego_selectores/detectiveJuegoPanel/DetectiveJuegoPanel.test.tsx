import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, afterEach, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import {DetectiveJuegoPanel} from './DetectiveJuegoPanel';

describe('DetectiveJuegoPanel', () => {
    // Función de rendeizar el componente
    const renderComponent = () => {
        return render(<DetectiveJuegoPanel />);
    };

    //Limpiamos los mocks y la sessionStorage
    afterEach(() => {
        cleanup();
        sessionStorage.clear();
        vi.restoreAllMocks();
    });

    it('renderiza título, imagen y botón', () => {
        renderComponent();
        //Obtenemos todos los elementos
        const titulo = screen.getByRole('heading', { name: /css detective/i });
        const imagen = screen.getByAltText('Detective principal');
        const boton = screen.getByRole('button', { name: /iniciar juego/i });
        //Verificar que están en el documento
        expect(titulo).toBeInTheDocument();
        expect(imagen).toBeInTheDocument();
        expect(boton).toBeInTheDocument();
    });


    it('elimina niveles de sessionStorage y redirige al primer nivel al hacer clic', async () => {
        // Simula claves guardadas en sessionStorage
        sessionStorage.setItem('nivel1Superado', 'true');
        sessionStorage.setItem('nivel2Superado', 'true');
        // Mock de window.location.href
        const locationMock = vi.spyOn(window, 'location', 'get');
        const hrefSetter = vi.fn();
        locationMock.mockReturnValue({
            get href() {
                return '';
            },
            set href(value: string) {
                hrefSetter(value);
            },
        } as any);
        //Renderiza el componente
        renderComponent();
        //Obtenemos el boton y simula que le da clic
        const boton = screen.getByRole('button', { name: /iniciar juego/i });
        await userEvent.click(boton);
        //Comprueba que los item esten eliminados y que se vaya al primer nivel
        expect(sessionStorage.getItem('nivel1Superado')).toBeNull();
        expect(sessionStorage.getItem('nivel2Superado')).toBeNull();
        expect(hrefSetter).toHaveBeenCalledWith('/juego/selectores/nivel-1');
    });
});
