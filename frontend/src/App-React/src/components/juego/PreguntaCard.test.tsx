/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import PreguntaCard from './PreguntaCard';

const preguntaMock = {
  enunciado: '¿Cuál es la capital de España?',
  tipo: 'M',
  respuestaCorrecta: 'Madrid',
  respuestasPregunta: ['Barcelona', 'Valencia', 'Sevilla']
};

describe('PreguntaCard', () => {
  let onRespuestaMock: any;

  beforeEach(() => {
    onRespuestaMock = vi.fn();
  });

  it('renderiza el enunciado', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={30} mensajeTiempo={false} />);
    expect(screen.getByText(/capital de España/)).toBeInTheDocument();
  });

  it('muestra el tiempo en verde si es mayor a 20s', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={25} mensajeTiempo={false} />);
    expect(screen.getByText((content) => content.includes('⏱') && content.includes('25'))).toHaveClass('text-green-400');
  });

  it('muestra cuatro botones de respuesta', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={30} mensajeTiempo={false} />);
    expect(screen.getAllByRole('button').length).toBe(4);
  });

  it('llama a onRespuesta(true) si la respuesta es correcta', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={20} mensajeTiempo={false} />);
    fireEvent.click(screen.getByText('Madrid'));
    expect(onRespuestaMock).toHaveBeenCalledWith(true, 'M');
  });

  it('llama a onRespuesta(false) si la respuesta es incorrecta', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={20} mensajeTiempo={false} />);
    fireEvent.click(screen.getByText('Valencia'));
    expect(onRespuestaMock).toHaveBeenCalledWith(false, 'M');
  });

  it('no permite seleccionar más de una vez', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={20} mensajeTiempo={false} />);
    fireEvent.click(screen.getByText('Valencia'));
    fireEvent.click(screen.getByText('Madrid'));
    expect(onRespuestaMock).toHaveBeenCalledTimes(1);
  });

  it('muestra mensaje de "Respuesta correcta"', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={20} mensajeTiempo={false} />);
    fireEvent.click(screen.getByText('Madrid'));
    expect(screen.getByText(/✅ ¡Respuesta correcta!/i)).toBeInTheDocument();
  });

  it('muestra mensaje de "Incorrecto"', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={20} mensajeTiempo={false} />);
    fireEvent.click(screen.getByText('Sevilla'));
    expect(screen.getByText((content) => content.includes('❌') && content.includes('Incorrecto'))).toBeInTheDocument();
  });

  it('muestra mensaje de "Se acabó el tiempo"', () => {
    render(<PreguntaCard pregunta={preguntaMock} onRespuesta={onRespuestaMock} tiempoRestante={0} mensajeTiempo={true} />);
    expect(screen.getByText(/⏰ ¡Se acabó el tiempo!/i)).toBeInTheDocument();
  });
});
