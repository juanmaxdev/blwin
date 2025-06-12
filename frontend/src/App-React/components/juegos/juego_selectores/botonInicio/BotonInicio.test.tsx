import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import BotonVolverInicio from './botonInicio';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('BotonVolverInicio', () => {
  const renderComponent = () => {
    return render(<BotonVolverInicio />);
  };

  it('se renderiza correctamente', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /volver al inicio/i });
    expect(button).toBeInTheDocument();
  });

  it('recarga la página al hacer clic (window.parent.location.reload)', async () => {
    const reloadMock = vi.fn();

    // Mock de window.parent.location.reload
    Object.defineProperty(window, 'parent', {
      value: {
        location: {
          reload: reloadMock,
        },
      },
      writable: true,
    });

    renderComponent();

    const button = screen.getByRole('button', { name: /volver al inicio/i });
    await userEvent.click(button);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
