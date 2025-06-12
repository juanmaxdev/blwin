// src/App-React/components/juegos/ahorcado/modelo/Modelo.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModeloImagen from './Modelo';

describe('<ModeloImagen />', () => {
  it('renderiza una imagen con src y alt proporcionados', () => {
    const ruta = 'ruta/a/la/imagen.png';
    const descripcion = 'Descripción de prueba';

    render(<ModeloImagen rutaImagen={ruta} descripImagen={descripcion} />);

    const img = screen.getByRole('img', { name: /Descripción de prueba/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', ruta);
    expect(img).toHaveAttribute('alt', descripcion);
  });
});
