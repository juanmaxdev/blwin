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
    render(<Temporizador jugando={false} fila={0} columna={0} />);
    expect(screen.getByText('0s')).toBeInTheDocument();
  });

  it('debe aplicar correctamente los estilos de grid', () => {
    const { container } = render(<Temporizador jugando={false} fila={3} columna={4} />);
    const wrapper = container.firstChild as HTMLElement;

    const style = getComputedStyle(wrapper);
    expect(style.gridColumn).toMatch(/^4\s*\/\s*5$/);
    expect(style.gridRow).toMatch(/^3\s*\/\s*4$/);
  });
});
