import { render, screen, act } from '@testing-library/react';
import FrasesJugador from '../../../personajes/frases/FrasesJugador';
import { vi } from 'vitest';

describe('Componente FrasesJugador', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('no muestra frase si estadoJuego diferente de pregunta', () => {
    render(
      <FrasesJugador
        tipoJefe="react"
        vidaJugador={100}
        estadoJuego="otraFase"
        fallosConsecutivos={0}
      />
    );
    expect(screen.queryByText(/¡/)).toBeNull();
  });

  it('muestra frase de React en fase pregunta con probabilidad controlada', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    render(
      <FrasesJugador
        tipoJefe="react"
        vidaJugador={80}
        estadoJuego="pregunta"
        fallosConsecutivos={0}
      />
    );

    act(() => vi.advanceTimersByTime(0));

    const posibles = [
      "¡Los hooks de React no tienen secretos para mí!",
      "useState y useEffect son mis mejores aliados.",
      "¡Voy a componentizar tu derrota!",
      "Mi código React es más limpio que tu interfaz.",
    ];
    const frase = screen.getByText((text) => posibles.includes(text));
    expect(frase).toBeInTheDocument();
  });

  it('muestra frase de fallos consecutivos para scrum', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    render(
      <FrasesJugador
        tipoJefe="scrum"
        vidaJugador={50}
        estadoJuego="pregunta"
        fallosConsecutivos={2}
      />
    );

    act(() => vi.advanceTimersByTime(0));

    const esperado = "¡El equipo está perdiendo la confianza!";
    expect(screen.getByText(esperado)).toBeInTheDocument();
  });

  it('muestra frase por vida baja fuera de pregunta', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4);

    render(
      <FrasesJugador
        tipoJefe="java"
        vidaJugador={20}
        estadoJuego="otraFase"
        fallosConsecutivos={0}
      />
    );

    act(() => vi.advanceTimersByTime(0));

    const posiblesBaja = [
      "¡Mi código está lleno de NullPointerExceptions!",
      "¿Cómo se maneja la memoria en Java?",
      "¡Necesito más café para entender esto!",
      "Mi aplicación tiene más bugs que features.",
    ];
    const frase = screen.getByText((text) => posiblesBaja.includes(text));
    expect(frase).toBeInTheDocument();
  });
});
