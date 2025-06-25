// EmpezarJuego.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EmpezarJuego from '../../../dialogos/modalInicio/empezarJuego';

describe('EmpezarJuego', () => {
  const mockSeleccionarJefe = vi.fn();

  beforeEach(() => {
    mockSeleccionarJefe.mockClear();
  });

  it('muestra todos los jefes y permite seleccionar uno no derrotado', () => {
    render(
      <EmpezarJuego
        onSeleccionarJefe={mockSeleccionarJefe}
        jefesDerrotados={['java', 'scrum']}
        esSeleccionPostVictoria={false}
      />
    );

    // Comprueba que se muestren los jefes
    expect(screen.getByText('Jefe React')).toBeInTheDocument();
    expect(screen.getByText('Jefe Java')).toBeInTheDocument();
    expect(screen.getByText('Jefe Scrum')).toBeInTheDocument();

    // Java está derrotado: debe estar deshabilitado (grayscale)
    const jefeJava = screen.getByTestId('jefe-card-java');
    expect(jefeJava).toHaveClass('opacity-60');
    expect(jefeJava).toHaveClass('cursor-not-allowed');

    // React no está derrotado: se puede seleccionar
    const jefeReact = screen.getByTestId('jefe-card-react');
    expect(jefeReact).toHaveClass('cursor-pointer');

    // Selecciona React
    fireEvent.click(jefeReact);

    // Botón se habilita
    const botonEmpezar = screen.getByRole('button', { name: /¡empezar aventura!/i });
    expect(botonEmpezar).toBeEnabled();

    // Click en el botón debe llamar onSeleccionarJefe
    fireEvent.click(botonEmpezar);
    expect(mockSeleccionarJefe).toHaveBeenCalledWith('react');
  });

  it('si todos los jefes están derrotados, muestra mensaje final', () => {
    render(
      <EmpezarJuego
        onSeleccionarJefe={mockSeleccionarJefe}
        jefesDerrotados={['react', 'java', 'net', 'mamon', 'programador', 'scrum']}
        esSeleccionPostVictoria={true}
      />
    );

    expect(screen.getByText(/¡eres el campeón de codequest!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /jugar de nuevo/i })).toBeInTheDocument();
  });
});
