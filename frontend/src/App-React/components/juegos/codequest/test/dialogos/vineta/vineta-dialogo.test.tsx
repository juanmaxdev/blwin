import { render, screen, act } from '@testing-library/react';
import VinetaDialogo from '../../../dialogos/vineta/vineta-dialogo'
import { vi } from 'vitest';

describe('VinetaDialogo', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Control del tiempo
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('muestra el texto y ejecuta animaciones temporales', () => {
    const texto = '¡Hola, soy un NPC!';
    const mockOnDesaparecer = vi.fn();

    render(
      <VinetaDialogo
        texto={texto}
        posicion="izquierda"
        duracion={3000}
        onDesaparecer={mockOnDesaparecer}
      />
    );

    // Verifica que el texto esté presente
    expect(screen.getByText(texto)).toBeInTheDocument();

    // 1. Espera a que aparezca la viñeta (después de 100ms)
    act(() => {
      vi.advanceTimersByTime(100);
    });
    const container = screen.getByText(texto).parentElement?.parentElement!;
    expect(container.className).toMatch(/opacity-100/);

    // 2. Espera hasta que empiece a desaparecer (en duracion - 500ms = 2500ms)
    act(() => {
      vi.advanceTimersByTime(2400); // Total: 2500ms
    });
    expect(container.className).toMatch(/opacity-0/);

    // 3. Espera al final para llamar onDesaparecer
    act(() => {
      vi.advanceTimersByTime(500); // Total: 3000ms
    });
    expect(mockOnDesaparecer).toHaveBeenCalled();
  });
});
