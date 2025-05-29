import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonajeCarrusel from './PersonajeCarrusel';

test('muestra el personaje seleccionado al hacer clic', () => {
  render(<PersonajeCarrusel />);
  
  // Clic en el personaje "Robotín v2.0"
  const imagen = screen.getByAltText('Robotín v2.0');
  fireEvent.click(imagen);

  // Se espera ver su nombre y parte de su historia
  expect(screen.getByText('Robotín v2.0')).toBeInTheDocument();
  expect(screen.getByText(/Forjado en los laboratorios/i)).toBeInTheDocument();
});
