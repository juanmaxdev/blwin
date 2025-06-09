import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import ModalFelicitacion from './ModalFelicitacion';

describe('ModalFelicitacion', () => {
  // Función para renderizar el componente 
  const renderComponent = (onClose = vi.fn()) =>
    render(<ModalFelicitacion onClose={onClose} />);

  // Limpiamos 
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renderiza título, imagen y texto de felicitación', () => {
    const onClose = vi.fn();
    renderComponent(onClose);
    // Recogemos los elementos y compronbamos que salga
    const img = screen.getByAltText('Felicitación');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/public/foto-detective-arrestando.png');
    //Comprueba el titulo
    expect(screen.getByText('¡¡Enhorabuena!!')).toBeInTheDocument();
    // Comprueba el texto del parrafo
    expect(
      screen.getByText(/Gracias a tu ayuda hemos identificado y capturado al ladrón de CSS/)
    ).toBeInTheDocument();
    //Comprueba el boton
    const button = screen.getByRole('button', { name: /¡Genial!/i });
    expect(button).toBeInTheDocument();
  });

  it('llama a onClose al hacer click en el botón', () => {
    const onClose = vi.fn();
    renderComponent(onClose);
    //Recogemos el boton
    const button = screen.getByRole('button', { name: /¡Genial!/i });
    //Le damos clic
    fireEvent.click(button);
    //Comprueba si el onClose se llama correctamente
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
