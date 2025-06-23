import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ContenedorPreguntas from '../../../../codequest/preguntas/contenedor/contenedorPreguntas';
import Temporizador from '../../../ui/Temporizador';

// Mock del hook useTiempoPorDificultad para que devuelva 5000ms (5s)
vi.mock('../../../ui/Temporizador', () => {
  return {
    __esModule: true,
    default: ({ onTiempoAgotado }: { onTiempoAgotado?: () => void }) => {
      // Llamamos onTiempoAgotado al montar
      if (onTiempoAgotado) onTiempoAgotado();
      return <div data-testid="temporizador" />;
    },
    useTiempoPorDificultad: () => 45,
  };
});

describe('ContenedorPreguntas', () => {
  const pregunta = '¿Qué es React?';
  const opcionesRespuesta = {
    a: 'Una librería de JavaScript',
    b: 'Un framework CSS',
    c: 'Un lenguaje de programación',
  };
  const respuestaCorrecta = 'a';

  const setup = (props = {}) =>
    render(
      <ContenedorPreguntas
        pregunta={pregunta}
        opcionesRespuesta={opcionesRespuesta}
        respuestaCorrecta={respuestaCorrecta}
        onSeleccionarRespuesta={vi.fn()}
        {...props}
      />
    );

  test('Renderiza pregunta, opciones y sin código si no se pasa', () => {
    setup();

    expect(screen.getByText(pregunta)).toBeInTheDocument();

    // Opciones deben aparecer con texto y letras
    Object.entries(opcionesRespuesta).forEach(([key, label]) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(key.toUpperCase())).toBeInTheDocument();
    });

    // No debe haber código si no se pasa prop
    expect(screen.queryByRole('code')).not.toBeInTheDocument();
  });

  test('Renderiza código si se pasa la prop codigo', () => {
    const codigo = "console.log('Hola mundo');";
    setup({ codigo });

    expect(screen.getByText(codigo)).toBeInTheDocument();
  });

  test('Al hacer click en opción válida llama a onSeleccionarRespuesta', async () => {
    const onSeleccionarRespuesta = vi.fn();
    setup({ onSeleccionarRespuesta });

    const opcionA = screen.getByText(opcionesRespuesta.a);
    await userEvent.click(opcionA);

    expect(onSeleccionarRespuesta).toHaveBeenCalledWith('a');
  });

  test('No llama onSeleccionarRespuesta si la opción está oculta', async () => {
    const onSeleccionarRespuesta = vi.fn();
    setup({ onSeleccionarRespuesta, opcionesOcultas: ['a'] });

    const opcionA = screen.getByText(opcionesRespuesta.a);
    await userEvent.click(opcionA);

    expect(onSeleccionarRespuesta).not.toHaveBeenCalled();
  });

  test('No llama onSeleccionarRespuesta si ya hay respuesta seleccionada', async () => {
    const onSeleccionarRespuesta = vi.fn();
    setup({ onSeleccionarRespuesta, respuestaSeleccionada: 'b' });

    const opcionA = screen.getByText(opcionesRespuesta.a);
    await userEvent.click(opcionA);

    expect(onSeleccionarRespuesta).not.toHaveBeenCalled();
  });

  test('Muestra mensaje correcto si la respuesta seleccionada es correcta', () => {
    setup({ respuestaSeleccionada: 'a' });

    expect(screen.getByText('¡Correcto! Has seleccionado la respuesta correcta.')).toBeInTheDocument();
  });

  test('Muestra mensaje correcto si la respuesta seleccionada es incorrecta', () => {
    setup({ respuestaSeleccionada: 'b' });

    expect(screen.getByText(`Incorrecto. La respuesta correcta era: A - ${opcionesRespuesta.a}`)).toBeInTheDocument();
  });

  test('Renderiza el temporizador si se pasa dificultad', () => {
    setup({ dificultad: 'facil' });

    expect(screen.getByTestId('temporizador')).toBeInTheDocument();
  });

  test('Llama onTiempoAgotado cuando el temporizador se agota y no hay respuesta', () => {
    const onTiempoAgotado = vi.fn();
    setup({ dificultad: 'facil', onTiempoAgotado });
    expect(onTiempoAgotado).toHaveBeenCalled();
  });
});
