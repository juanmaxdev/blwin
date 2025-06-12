import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

import BotonVolverInicio from './botonInicio';

// Mock parcial del módulo react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

//Limpiar Mocks
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('BotonInicio', () => {
  //Funcion que permite renderizar el componente
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <BotonVolverInicio />
      </MemoryRouter>
    );
  };

  it('se renderiza correctamente', () => {
    //Renderiza el componente
    renderComponent();
    //Comprueba que el boton con el label especifico se muestre en el documento
    const button = screen.getByRole('button', { name: /volver al inicio/i });
    expect(button).toBeInTheDocument();
  });

  it('navega a "/" al hacer clic', async () => {
    // Crea un mock de la función navigate
    const mockNavigate = vi.fn();
    // Hace que useNavigate devuelva el mock anterior
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    // Renderiza el componente 
    renderComponent();
    // Obtiene el botón y hace un click
    const button = screen.getByRole('button', { name: /volver al inicio/i });
    await userEvent.click(button);
    // Verifica que navigate fue llamado con la ruta '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');
    // Verifica que navigate fue llamado exactamente una vez
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
