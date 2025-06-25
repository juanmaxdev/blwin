import { render, screen, act } from '@testing-library/react';
import Temporizador from '../../ui/Temporizador';
import { vi } from 'vitest';

describe('Temporizador', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renderiza correctamente el temporizador con duración inicial', () => {
    render(<Temporizador duracion={60} onTiempoAgotado={() => {}} activo={false} />);

    expect(screen.getByTestId('temporizador')).toBeInTheDocument();
    expect(screen.getByText('01:00')).toBeInTheDocument();
  });

  it('cuenta hacia atrás cuando está activo', () => {
    render(<Temporizador duracion={10} onTiempoAgotado={() => {}} activo={true} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:07')).toBeInTheDocument();
  });

  it('llama a onTiempoAgotado cuando llega a 0', () => {
    const onTiempoAgotado = vi.fn();
    render(<Temporizador duracion={3} onTiempoAgotado={onTiempoAgotado} activo={true} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onTiempoAgotado).toHaveBeenCalled();
  });

  it('muestra el mensaje de urgencia cuando faltan 10 segundos o menos', () => {
    render(<Temporizador duracion={10} onTiempoAgotado={() => {}} activo={true} />);

    act(() => {
      vi.advanceTimersByTime(1000); // 9 segundos restantes
    });

    expect(screen.getByText(/¡Te quedas sin tiempo campeón!/)).toBeInTheDocument();
  });

  it('reinicia correctamente si cambia la duración', () => {
    const { rerender } = render(<Temporizador duracion={20} onTiempoAgotado={() => {}} activo={true} />);

    act(() => {
      vi.advanceTimersByTime(5000); // quedan 15
    });
    expect(screen.getByText('00:15')).toBeInTheDocument();

    rerender(<Temporizador duracion={10} onTiempoAgotado={() => {}} activo={true} />);
    expect(screen.getByText('00:10')).toBeInTheDocument();
  });

  it('no cuenta si activo es false', () => {
    render(<Temporizador duracion={10} onTiempoAgotado={() => {}} activo={false} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('00:10')).toBeInTheDocument();
  });
});
