/// <reference types="vitest" />
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Head } from './Head';

describe('Head', () => {
  // Antes de cada test, limpiamos el título del documento y cualquier meta descripción existente
  beforeEach(() => {
    document.title = 'Documento Original';

    const existingMeta = document.querySelector("meta[name='description']");
    if (existingMeta) {
      existingMeta.remove(); // elimina para que los tests partan de un estado limpio
    }
  });

  // ✅ Verifica que el título se actualiza correctamente
  it('actualiza el título del documento', () => {
    render(<Head title="Página de prueba" />);
    expect(document.title).toBe('Página de prueba');
  });

  // ✅ Verifica que si cambia la prop title, también se actualiza el título
  it('actualiza el título cuando cambia la prop', () => {
    const { rerender } = render(<Head title="Título A" />);
    expect(document.title).toBe('Título A');

    // Rerender con nuevo título
    rerender(<Head title="Título B" />);
    expect(document.title).toBe('Título B');
  });

  // ✅ Si no existe una etiqueta <meta name="description"> y se pasa `description`, se crea
  it('añade una meta description si no existe y se pasa la prop', () => {
    render(<Head title="Título" description="Esta es una descripción" />);
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;

    expect(meta).not.toBeNull(); // verifica que se ha creado
    expect(meta.content).toBe('Esta es una descripción'); // y que tiene el valor correcto
  });

  // ✅ Si ya existe una <meta name="description">, la reutiliza y la actualiza
  it('actualiza el contenido de una meta description existente', () => {
    // Preparamos manualmente una etiqueta meta existente
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Antigua descripción';
    document.head.appendChild(meta);

    render(<Head title="Título" description="Descripción actualizada" />);
    const updatedMeta = document.querySelector("meta[name='description']") as HTMLMetaElement;

    expect(updatedMeta.content).toBe('Descripción actualizada'); // se ha sobrescrito el contenido
  });

  // ✅ Si no se proporciona descripción, no se crea ni modifica ningún <meta>
  it('no modifica la descripción si no se proporciona', () => {
    render(<Head title="Solo título" />);
    const meta = document.querySelector("meta[name='description']");
    expect(meta).toBeNull(); // no debería haber ninguna
  });

  // ✅ El componente no muestra nada visual en el DOM
  it('no renderiza ningún contenido visible', () => {
    const { container } = render(<Head title="Invisible" />);
    expect(container).toBeEmptyDOMElement(); // el contenedor está vacío
  });
});
