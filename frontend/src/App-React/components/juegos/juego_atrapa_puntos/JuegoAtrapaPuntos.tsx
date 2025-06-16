import { useState, useEffect } from 'react';
import preguntas4 from './Preguntas4Opciones';
import preguntas3 from './Preguntas3Opciones';
import preguntas2 from './Preguntas2Opciones';
import PreguntaActual from './PreguntaActual';
import PantallaFinal from './PantallaFinal';
import BotonHome from '../sopaLetras/BotonHome';
import { obtenerPuntuacionUsuario } from '../../../hooks/ObtenerPuntuacionUsuario';
import { restarPuntuacion } from '../../../hooks/RestarPuntuacion';
import { mandarPuntuacion } from '../../../hooks/MandarPuntuacion';

export interface Pregunta {
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
}

function JuegoAtrapaPuntos() {
  const [puntos, setPuntos] = useState<number>(0);
  const [puntosFinales, setPuntosFinales] = useState<number | null>(null);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = async () => {
    setLoading(true);
    let initialPoints = 0;
    try {
      const response = await obtenerPuntuacionUsuario();
      if (response.ok) {
        const data = await response.json();
        if (typeof data.puntos === 'number') {
          initialPoints = data.puntos;
        }
      } else {
        console.warn('Error al obtener puntuación del usuario:', response.status);
      }
    } catch (error) {
      console.error('Error en fetch de puntuación:', error);
    }

    setPuntos(initialPoints);
    setPuntosFinales(null);
    setRachaCorrectas(0);
    setTotalCorrectas(0);
    setEtapa('4');
    setFinJuego(false);
    setTotalApostado(0);
    setUltimaRespuestaCorrecta(null);
    const mezcladas = mezclarArray([...preguntas4]);
    setRestantes(mezcladas);
    escogerPregunta(mezcladas);
    setLoading(false);
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

  const enviarRespuesta = async () => {
    if (totalApostadoActual !== puntos) {
      alert(`Debes apostar exactamente todos tus puntos: ${puntos}.`);
      return;
    }
    if (!actual) return;

    const correcto = actual.respuesta_correcta;
    const apuestaCorrecta = apuestas[correcto];
    const apuestaIncorrecta = totalApostadoActual - apuestaCorrecta;

    if (apuestaIncorrecta > 0) {
      try {
        const response = await restarPuntuacion(apuestaIncorrecta);
        if (!response.ok) {
          alert("Error al restar puntos en el servidor");
          return;
        }
        const data = await response.json();
        setPuntos(data.puntos);
      } catch (error) {
        console.error("Error al restar puntos:", error);
        alert("Error al restar puntos");
        return;
      }
    }

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

  const siguientePregunta = async () => {
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
        let nuevosPuntos = puntos;
        if (totalCorrectas === 13) {
          nuevosPuntos = puntos > 0 ? puntos : 1000;
        }
        setPuntos(nuevosPuntos);
        setPuntosFinales(nuevosPuntos);
        setEtapa('final');
        setActual(null);

        try {
          await mandarPuntuacion('AtrapaPuntos', nuevosPuntos);
        } catch (err) {
          console.error('Error al enviar puntuación final:', err);
        }
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
  const puntajeFinal = puntosFinales !== null ? puntosFinales : puntos;

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200">
        <span className="text-2xl font-semibold text-indigo-800">Cargando puntuación...</span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-200 overflow-hidden">
      <header className="h-20 flex items-center justify-center bg-white/50 shadow-md">
        <BotonHome />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow my-6">Juego Atrapa un Millón de Puntos</h1>
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