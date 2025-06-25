import { render, screen, cleanup} from '@testing-library/react';
import { describe, it, vi, expect, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

import NivelBonus from './NivelBonus';

// Mock de canvas-confetti para evitar errores en JSDOM
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
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

describe('NivelBonus', () => {
  // Función para renderizar el componente 
  const renderComponent = () => render(<NivelBonus />);

  // Limpiamos
  afterEach(() => {
    cleanup();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('renderiza los elementos de la primera parte correctamente', () => {
    renderComponent();
    // Recoge el título principal
expect(screen.getByRole('heading', { name: /nivel 10 - css detective/i })).toBeInTheDocument();
    // Comprueba
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
  });

  /*
  it('valida CSS parte 1 y muestra la segunda parte tras timeout', async () => {
    vi.useFakeTimers();
    renderComponent();
    //Recoge todos los elementos
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /confirmar/i });
    // CSS correcto para la parte 1
    const cssParte1 = `
      #detective {{ position: absolute; left: 0; }}
    `;
    await userEvent.clear(textarea);
    await userEvent.type(textarea, cssParte1);
    //Hacer clic al boton
    fireEvent.click(button);
    // Debe almacenarse en sessionStorage
    expect(sessionStorage.getItem('nivelBonusSuperado')).toBe('true');
    // Aparece mensaje de éxito
    expect(await screen.findByText(/¡perfecto! el detective se ha alineado correctamente/i)).toBeInTheDocument();
    // Avanzamos el temporizador para mostrar la segunda parte
    vi.advanceTimersByTime(1500);
    // Ahora debería verse el heading de la parte 2
    expect(
      screen.getByRole('heading', { name: /nivel bonus - css detective \(parte 2\)/i })
    ).toBeInTheDocument();
    vi.useRealTimers();
  });
  */
});
