import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonajeCarrusel from './PersonajeCarrusel';

test('muestra el personaje seleccionado al hacer clic', () => {
  render(<PersonajeCarrusel />);
  
  // Clic en el personaje "Robotín v2.0"
  const imagen = screen.getByAltText('Z-Wing');
  fireEvent.click(imagen);

  // Se espera ver su nombre y parte de su historia
  expect(screen.getByText('Z-Wing')).toBeInTheDocument();
  expect(screen.getByText(/Las naves Z-Wing surcan el espacio en busca de conocimiento y descubrimientos. Hoy es tu primer día como piloto, y el universo entero se abre ante ti. ¡Veamos hasta dónde puedes llegar!/i)).toBeInTheDocument();
});
