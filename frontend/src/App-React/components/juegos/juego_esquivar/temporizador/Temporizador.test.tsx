import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import Temporizador from './Temporizador';

describe('Temporizador', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('inicia desde 0 segundos', () => {
    render(<Temporizador isRunning={false} />);
    expect(screen.getByText('0s')).toBeInTheDocument();
  });

  it('incrementa segundos cuando isRunning es true', () => {
    render(<Temporizador isRunning={true} />);
    
    vi.advanceTimersByTime(3000);

    expect(screen.getByText('3s')).toBeInTheDocument();
  });

  it('no incrementa cuando isRunning es false', () => {
    render(<Temporizador isRunning={false} />);

    vi.advanceTimersByTime(5000);

    expect(screen.getByText('0s')).toBeInTheDocument();
  });
});
