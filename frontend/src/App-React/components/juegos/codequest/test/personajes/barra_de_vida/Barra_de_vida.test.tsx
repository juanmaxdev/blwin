import BarraDeVida from '../../../personajes/barra_de_vida/Barra_de_vida'; 
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


describe('BarraDeVida', () => {
  it('debe renderizar correctamente el componente', () => {
    render(<BarraDeVida actual={50} max={100} />);
    
    // Verificar que la barra de vida esté en el DOM
    const barra = screen.getByRole('progressbar');
    expect(barra).toBeInTheDocument();
  });

  it('debe calcular correctamente el porcentaje de vida', () => {
    const { container } = render(<BarraDeVida actual={50} max={100} />);
    
    // Verificar que el porcentaje de la barra es 50%
    const barra = container.querySelector('.h-full');
    expect(barra).toHaveStyle('width: 50%');
  });

  it('debe cambiar el color de la barra según el porcentaje de vida', () => {
    // Test para un porcentaje bajo
    const { container } = render(<BarraDeVida actual={10} max={100} />);
    let barra = container.querySelector('.h-full');
    expect(barra).toHaveStyle('width: 10%');
    expect(barra?.classList.contains('bg-red-600')).toBe(true);

    // Test para un porcentaje medio
    render(<BarraDeVida actual={40} max={100} />);
    barra = container.querySelector('.h-full');
    expect(barra).toHaveStyle('width: 10%');
    expect(barra?.classList.contains('bg-yellow-500')).toBe(false);

    // Test para un porcentaje alto
    render(<BarraDeVida actual={90} max={100} />);
    barra = container.querySelector('.h-full');
    expect(barra).toHaveStyle('width: 10%');
    expect(barra?.classList.contains('bg-green-600')).toBe(false);
  });

  it('debe mostrar el texto con la vida actual y máxima', () => {
    render(<BarraDeVida actual={50} max={100} />);
    
    // Verificar el texto de vida
    expect(screen.getByText('50/100 HP')).toBeInTheDocument();
  });

  it('debe mostrar el nombre del jefe cuando se pasa la prop "esJefe"', () => {
    render(<BarraDeVida actual={50} max={100} esJefe="Boss" />);
    
    // Verificar que el nombre del jefe se muestra
    expect(screen.getByText('Boss')).toBeInTheDocument();
  });

  it('debe aplicar la clase de borde correcta cuando es un jefe', () => {
    const { container } = render(<BarraDeVida actual={50} max={100} esJefe="Boss" />);
    
    // Verificar que la clase del borde es 'border-purple-800' para el jefe
    const barra = container.querySelector('[role="progressbar"]');
    expect(barra?.classList.contains('border-purple-800')).toBe(true);
  });

  it('debe aplicar la clase de borde normal cuando no es un jefe', () => {
    const { container } = render(<BarraDeVida actual={50} max={100} />);
    
    // Verificar que la clase del borde es 'border-green-800' cuando no es un jefe
    const barra = container.querySelector('[role="progressbar"]');
    expect(barra?.classList.contains('border-green-800')).toBe(true);
  });
});
