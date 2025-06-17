import { describe, it, expect, vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import JuegoAtrapaPuntos from './JuegoAtrapaPuntos';

// Mocks de funciones que hace fetch a la API
vi.mock('../../../hooks/ObtenerPuntuacionUsuario', () => ({
    obtenerPuntuacionUsuario: vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ puntos: 1000 }),
        })
    ),
}));

vi.mock('../../../hooks/RestarPuntuacion', () => ({
    restarPuntuacion: vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ puntos: 900 }),
        })
    ),
}));

vi.mock('../../../hooks/MandarPuntuacion', () => ({
    mandarPuntuacion: vi.fn(() => Promise.resolve()),
}));

// Mocks de dependencias de UI
vi.mock('./PreguntaActual', () => ({
    default: () => <div data-testid="pregunta-actual">PreguntaActual</div>,
}));
vi.mock('./PantallaFinal', () => ({
    default: () => <div data-testid="pantalla-final">PantallaFinal</div>,
}));
vi.mock('../sopaLetras/BotonHome', () => ({
    default: () => <button>Home</button>,
}));

describe('JuegoAtrapaPuntos', () => {
    it('muestra la pantalla de carga inicialmente', () => {
        // Renderiza el componente
        render(<JuegoAtrapaPuntos />);
        // Verifica que se muestre el mensaje de carga
        expect(screen.getByText(/cargando puntuación/i)).toBeInTheDocument();
    });
});
