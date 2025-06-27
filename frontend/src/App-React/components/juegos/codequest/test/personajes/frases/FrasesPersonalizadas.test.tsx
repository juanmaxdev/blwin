import { render, screen } from '@testing-library/react';
import FrasesPersonalizadas from '../../../personajes/frases/FrasesPersonalizadas';
import { vi } from 'vitest';

describe('FrasesPersonalizadas', () => {
  // Mock determinista de Math.random
  let randomSpy: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterAll(() => {
    randomSpy.mockRestore();
  });

  const casos = [
    {
      tipo: 'motivacional',
      clase: 'bg-green-100 border-green-400 text-green-800',
      emoji: '💪',
      general: '¡Puedo hacerlo!',
      react: '¡React no tiene secretos para mí!',
    },
    {
      tipo: 'preocupacion',
      clase: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      emoji: '😅',
      general: 'Esto se está poniendo difícil...',
      react: '¿Era useEffect o useLayoutEffect?',
    },
    {
      tipo: 'desesperacion',
      clase: 'bg-red-100 border-red-400 text-red-800',
      emoji: '😰',
      general: '¡Esto es más difícil de lo que pensaba!',
      react: '¡Mi aplicación se está crasheando!',
    },
    {
      tipo: 'victoria',
      clase: 'bg-blue-100 border-blue-400 text-blue-800',
      emoji: '🎉',
      general: '¡Lo logré!',
      react: '¡React ha sido conquistado!',
    },
    {
      tipo: 'derrota',
      clase: 'bg-gray-100 border-gray-400 text-gray-800',
      emoji: '😔',
      general: 'He fallado... pero aprenderé de esto.',
      react: 'React me ha vencido... por ahora.',
    },
  ];

  casos.forEach(({ tipo, clase, emoji, general, react: fraseReact }) => {
    describe(`tipo=${tipo}`, () => {
      it('renderiza frase general, clases y emoji', () => {
        render(<FrasesPersonalizadas tipo={tipo as any} />);
        expect(screen.getByText(general)).toBeInTheDocument();
        const cont = screen.getByText(general).closest('div');
        expect(cont).toHaveClass(clase);
        expect(screen.getByText(emoji)).toBeInTheDocument();
      });

      it('renderiza frase de contexto react', () => {
        render(<FrasesPersonalizadas tipo={tipo as any} contexto="react" />);
        expect(screen.getByText(fraseReact)).toBeInTheDocument();
      });
    });
  });

  it('aplica className adicional', () => {
    const extra = 'miClaseExtra';
    render(<FrasesPersonalizadas tipo="motivacional" className={extra} />);
    const cont = screen.getByText('¡Puedo hacerlo!').closest('div');
    expect(cont).toHaveClass(extra);
  });
});