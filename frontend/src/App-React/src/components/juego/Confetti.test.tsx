/// <reference types="vitest" />
import { render } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import Confetti from './Confetti';
import confetti from 'canvas-confetti';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Confetti', () => {
  const mockedConfetti = confetti as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('no lanza confetti si trigger es false', () => {
    render(<Confetti trigger={false} />);
    expect(mockedConfetti).not.toHaveBeenCalled();
  });

  it('lanza confetti si trigger es true', () => {
    render(<Confetti trigger={true} />);
    
    // Avanzamos el tiempo para que el efecto tenga oportunidad de ejecutarse
    vi.advanceTimersByTime(100);

    // Como la función se llama dos veces por ciclo
    expect(mockedConfetti).toHaveBeenCalled();
    expect(mockedConfetti).toHaveBeenCalledWith(
      expect.objectContaining({
        particleCount: 5,
        angle: expect.any(Number),
        spread: 55,
        origin: expect.any(Object),
        colors: expect.any(Array),
      })
    );
  });
});
