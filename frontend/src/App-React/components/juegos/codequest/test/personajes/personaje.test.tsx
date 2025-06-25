import { render, screen } from '@testing-library/react';
import Personaje from '../../../codequest/personajes/personaje';

describe('Personaje component', () => {
  const testImageUrl = 'https://example.com/test.png';

  it('renderiza con la imagen proporcionada y clase por defecto', () => {
    render(<Personaje imagen={testImageUrl} />);
    const container = screen.getByRole('img', { name: /personaje/i }).parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('w-64', 'h-64');

    const img = screen.getByRole('img', { name: /personaje/i });
    expect(img).toHaveAttribute('src', testImageUrl);
    expect(img).toHaveClass('w-full', 'h-full', 'object-contain', 'drop-shadow-lg');
  });

  it('usa el placeholder cuando la prop imagen está vacía', () => {
    render(<Personaje imagen={''} />);
    const img = screen.getByRole('img', { name: /personaje/i });
    expect(img).toHaveAttribute('src', '/placeholder.svg');
  });

  it('aplica una clase personalizada cuando se prove', () => {
    const customClass = 'custom-width custom-height';
    render(<Personaje imagen={testImageUrl} className={customClass} />);
    const container = screen.getByRole('img', { name: /personaje/i }).parentElement;
    expect(container).toHaveClass('custom-width', 'custom-height');
  });
});
