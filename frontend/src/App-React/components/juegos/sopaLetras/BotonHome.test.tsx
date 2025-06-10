import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BotonHome from './BotonHome';

describe('BotonHome', () => {
  it('renders the button', () => {
    render(<BotonHome />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('redirects to "/" on click', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });


    render(<BotonHome />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(window.location.href).toBe('/');
  });
});
