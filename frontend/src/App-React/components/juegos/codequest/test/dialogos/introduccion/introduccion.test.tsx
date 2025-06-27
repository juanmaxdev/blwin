import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Introduccion from '../../../dialogos/introduccion/introduccion';

// Mock GSAP core module and TextPlugin
vi.mock('gsap', () => ({
  gsap: {
    timeline: vi.fn((config) => {
      // If exit animation, immediately call onComplete
      if (config && typeof config.onComplete === 'function') {
        config.onComplete();
      }
      return {
        to: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
        call: vi.fn().mockImplementation((fn) => fn()),
      };
    }),
    set: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));
vi.mock('gsap/TextPlugin', () => ({ TextPlugin: {} }));

// Mock ModalDialogoIntro
vi.mock('../../../dialogos/introduccion/modalDialogo/modalDialogo', () => ({
  ModalDialogoIntro: ({ titulo, texto, onClose }: { titulo: string; texto: string; onClose: () => void }) => (
    <div data-testid="modal">
      <h2>{titulo}</h2>
      <p>{texto}</p>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock audio methods
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

vi.useFakeTimers();

describe('Componente Introduccion', () => {
  const onFinishMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Control de renderizado del boton de sonido', () => {
    render(<Introduccion onFinish={onFinishMock} />);

    const soundButton = screen.getByTitle(/Activar música/i);
    expect(soundButton).toBeInTheDocument();
    expect(soundButton).toHaveTextContent('🔇');

    fireEvent.click(soundButton);
    expect(soundButton).toHaveTextContent('🔊');
  });

  test('Mostrar el modal de ayuda cuando se hace click', () => {
    render(<Introduccion onFinish={onFinishMock} />);

    fireEvent.click(screen.getByTitle(/ayuda/i));
    expect(screen.getByText(/guía de codequest/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(screen.queryByText(/guía de codequest/i)).not.toBeInTheDocument();
  });

  test('Boton de skip', () => {
    render(<Introduccion onFinish={onFinishMock} />);
    fireEvent.click(screen.getByTitle(/saltar introducción/i));
    expect(onFinishMock).toHaveBeenCalled();
  });
});
