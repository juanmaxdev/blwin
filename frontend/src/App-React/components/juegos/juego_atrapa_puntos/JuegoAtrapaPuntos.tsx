import { useState, useEffect } from 'react';
import preguntas4 from './Preguntas4Opciones';
import preguntas3 from './Preguntas3Opciones';
import preguntas2 from './Preguntas2Opciones';
import PreguntaActual from './PreguntaActual';
import PantallaFinal from './PantallaFinal';
import BotonHome from '../sopaLetras/BotonHome';

export interface Pregunta {
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
}

function JuegoAtrapaPuntos() {
  const [puntos, setPuntos] = useState(1000);
  const [restantes, setRestantes] = useState<Pregunta[]>([]);
  const [actual, setActual] = useState<Pregunta | null>(null);
  const [apuestas, setApuestas] = useState<number[]>([]);
  const [respondido, setRespondido] = useState(false);
  const [rachaCorrectas, setRachaCorrectas] = useState(0);
  const [etapa, setEtapa] = useState<'4' | '3' | '2' | 'final'>('4');
  const [totalCorrectas, setTotalCorrectas] = useState(0);
  const [totalApostado, setTotalApostado] = useState(0);
  const [finJuego, setFinJuego] = useState(false);
  const [ultimaRespuestaCorrecta, setUltimaRespuestaCorrecta] = useState<boolean | null>(null);

  useEffect(() => {
    iniciarJuego();
  }, []);

 const iniciarJuego = () => {
    setPuntos(1000);  
    setRachaCorrectas(0);
    setTotalCorrectas(0);
    setEtapa('4');
    setFinJuego(false);
    setTotalApostado(0);
    setUltimaRespuestaCorrecta(null);
    const mezcladas = mezclarArray([...preguntas4]);
    setRestantes(mezcladas);
    escogerPregunta(mezcladas);
  };

  const mezclarArray = (array: Pregunta[]): Pregunta[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const escogerPregunta = (lista: Pregunta[]) => {
    if (!lista || lista.length === 0) {
      setActual(null);
      return;
    }
    const [q, ...resto] = lista;
    setRestantes(resto);
    setActual(q);
    setApuestas(new Array(q.opciones.length).fill(0));
    setRespondido(false);
    setUltimaRespuestaCorrecta(null);
  };

  const cambiarApuesta = (indice: number, valor: number) => {
    const actualizadas = [...apuestas];
    actualizadas[indice] = valor;
    setApuestas(actualizadas);
  };

  const totalApostadoActual = apuestas.reduce((a, b) => a + b, 0);

  const enviarRespuesta = () => {
    if (totalApostadoActual !== puntos) {
      alert(`Debes apostar exactamente todos tus puntos: ${puntos}.`);
      return;
    }
    if (!actual) return;

    const correcto = actual.respuesta_correcta;
    const apuestaCorrecta = apuestas[correcto];
    const apuestaIncorrecta = totalApostadoActual - apuestaCorrecta;

    if (apuestaIncorrecta > 0) setPuntos(p => p - apuestaIncorrecta);
    setTotalApostado(t => t + totalApostadoActual);

    const esCorrecta = apuestaCorrecta > 0 && apuestaIncorrecta === 0;
    setUltimaRespuestaCorrecta(esCorrecta);

    if (esCorrecta) {
      setRachaCorrectas(r => r + 1);
      setTotalCorrectas(c => c + 1);
    } else {
      setRachaCorrectas(0);
    }

    setRespondido(true);
  };

  const siguientePregunta = () => {
    if (ultimaRespuestaCorrecta) {
      const nuevaRacha = rachaCorrectas;
      if (etapa === '4' && nuevaRacha === 5) {
        const mezcladas3 = mezclarArray([...preguntas3]);
        setEtapa('3');
        setRachaCorrectas(0);
        setRestantes(mezcladas3);
        escogerPregunta(mezcladas3);
        return;
      }
      if (etapa === '3' && nuevaRacha === 4) {
        const mezcladas2 = mezclarArray([...preguntas2]).slice(0, 4);
        setEtapa('2');
        setRachaCorrectas(0);
        setRestantes(mezcladas2);
        escogerPregunta(mezcladas2);
        return;
      }
      if (etapa === '2' && nuevaRacha === 4) {
        setPuntos(p => p + totalApostado);
        setEtapa('final');
        setActual(null);
        return;
      }
      if (puntos <= 0 || restantes.length === 0) {
        setActual(null);
        return;
      }
      escogerPregunta(restantes);
    } else {
      if (etapa === '3' || etapa === '2') {
        setFinJuego(true);
        setActual(null);
        return;
      }
      if (puntos <= 0 || restantes.length === 0) {
        setActual(null);
        return;
      }
      escogerPregunta(restantes);
    }
  };

  const todasCorrectas = totalCorrectas === 13;
  const puntajeFinal = todasCorrectas ? puntos * 2 : puntos;

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200 overflow-hidden">
      <header className="h-20 flex items-center justify-center bg-white/50 shadow-md">
        <BotonHome />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow my-6">Juego de Sopa de Letras</h1>
      </header>
      <div className="mb-4 text-center">
        Tus puntos: <span className="font-semibold">{puntos}</span>
      </div>

      {actual ? (
        <PreguntaActual
          pregunta={actual}
          apuestas={apuestas}
          puntos={puntos}
          respondido={respondido}
          cambiarApuesta={cambiarApuesta}
          enviarRespuesta={enviarRespuesta}
          ultimaRespuestaCorrecta={ultimaRespuestaCorrecta}
          siguientePregunta={siguientePregunta}
        />
      ) : (
        <PantallaFinal
          etapa={etapa}
          finJuego={finJuego}
          todasCorrectas={todasCorrectas}
          puntajeFinal={puntajeFinal}
          reiniciar={iniciarJuego}
        />
      )}
    </div>
  );
}

export default JuegoAtrapaPuntos;
