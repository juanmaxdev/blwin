import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BotonHome from './BotonHome';

describe('BotonHome', () => {
  const reloadMock = vi.fn();

  beforeEach(() => {
    // Mock de window.parent.location.reload
    Object.defineProperty(window, 'parent', {
      value: {
        location: {
          reload: reloadMock,
        },
      },
      writable: true,
    });

    reloadMock.mockClear();
  });

  it('renders the button', () => {
    render(<BotonHome />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls window.parent.location.reload on click', () => {
    render(<BotonHome />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
