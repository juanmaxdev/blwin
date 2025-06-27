import { render, screen, fireEvent, act } from '@testing-library/react';
import UsuarioMamonMemoria from '../../../../escenarios/usuario_mamon/memoria/Usuario_mamon_memoria';
import { vi } from 'vitest';

vi.useFakeTimers();

describe('UsuarioMamonMemoria (sin tocar lógica)', () => {
  let onJuegoCompletado: ReturnType<typeof vi.fn>;
  let onJuegoFallado: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onJuegoCompletado = vi.fn();
    onJuegoFallado = vi.fn();
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  test('muestra y oculta el mensaje de memorizar tras 3 segundos', async () => {
    render(<UsuarioMamonMemoria onJuegoCompletado={onJuegoCompletado} onJuegoFallado={onJuegoFallado} />);

    expect(screen.queryByText(/¡Memoriza las posiciones!/i)).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /¡Empezar Juego!/i }));
    });
    expect(screen.getByText(/¡Memoriza las posiciones!/i)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText(/¡Memoriza las posiciones!/i)).toBeNull();
  }, 10000);


});
