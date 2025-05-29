import { useEffect, useState, useRef } from 'react';
import RuletaTematicas from '../components/juego/RuletaTematicas';
import PreguntaCard from '../components/juego/PreguntaCard';
import HeaderJuego from '../components/juego/HeaderJuego';
import ModalTematica from '../components/juego/ModalTematica';
import Confetti from '../components/juego/Confetti';
import RankingPartidas from '../components/juego/RankingPartidas';
import JugadoresActivos from '../components/juego/JugadoresActivos';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const tematicaLogo: Record<string, { logo: string }> = {
  Historia: { logo: '/personajes/Historia.png' },
  Informatica: { logo: '/personajes/Informatica.png' },
  Deportes: { logo: '/personajes/Deportes.png' },
  Ciencia: { logo: '/personajes/Ciencia.png' },
  Cine: { logo: '/personajes/Cine.png' },
  Geografia: { logo: '/personajes/Geografia.png' },
  Arte: { logo: '/personajes/Arte.png' },
  Música: { logo: '/personajes/Musica.png' },
  BergerLevrault: { logo: '/personajes/BL.png' },
};

const tematicaConfig: Record<string, { color: string; personaje: string }> = {
  Historia: { color: '#FACC15', personaje: '/personajes/personaje1.png' },
  Informatica: { color: '#3B82F6', personaje: '/personajes/personaje2.png' },
  Deportes: { color: '#FB923C', personaje: '/personajes/personaje3.png' },
  Ciencia: { color: '#86EFAC', personaje: '/personajes/personaje4.png' },
  Cine: { color: '#F472B6', personaje: '/personajes/personaje5.png' },
  Geografia: { color: '#15803D', personaje: '/personajes/personaje6.png' },
  Arte: { color: '#EF4444', personaje: '/personajes/personaje7.png' },
  Música: { color: '#A855F7', personaje: '/personajes/personaje8.png' },
  BergerLevrault: { color: '#a41e34', personaje: '/personajes/personaje9.png' },
};

const fondoPorTematica: Record<string, { from: string; via: string; to: string; figura: string }> = {
  Historia: { from: '#FEF9C3', via: '#FDE68A', to: '#FACC15', figura: '▲' },
  Informatica: { from: '#DBEAFE', via: '#93C5FD', to: '#3B82F6', figura: '■' },
  Deportes: { from: '#FFEDD5', via: '#FDBA74', to: '#FB923C', figura: '⬤' },
  Ciencia: { from: '#DCFCE7', via: '#86EFAC', to: '#4ADE80', figura: '◆' },
  Cine: { from: '#FCE7F3', via: '#F9A8D4', to: '#F472B6', figura: '★' },
  Geografia: { from: '#D1FAE5', via: '#6EE7B7', to: '#15803D', figura: '⬟' },
  Arte: { from: '#FECACA', via: '#F87171', to: '#EF4444', figura: '◼' },
  Música: { from: '#EDE9FE', via: '#C4B5FD', to: '#A855F7', figura: '♪' },
  BergerLevrault: { from: '#FDEBEB', via: '#D94F5C', to: '#A41E34', figura: '◙' }
};

const Juego = () => {
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState<string | null>(null);
  const [ultimaTematica, setUltimaTematica] = useState<string | null>(null);
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [mostrarTiempoFinalizado, setMostrarTiempoFinalizado] = useState(false);
  const [estadoPartida, setEstadoPartida] = useState<any>(null);
  const [animacionPuntos, setAnimacionPuntos] = useState(false);
  const [animacionVida, setAnimacionVida] = useState(false);
  const [mostrarModalTematica, setMostrarModalTematica] = useState(false);
  const [confettiActivo, setConfettiActivo] = useState(false);
  const [rankingPartidas, setRankingPartidas] = useState<any[] | null>(null);
  const [sabioUsado, setSabioUsado] = useState(false);
  const [forzarCorrecta, setForzarCorrecta] = useState(false);
  const yaRespondido = useRef(false);
  const partidaId = localStorage.getItem('partidaId');
  const usuarioNombre = localStorage.getItem('usuarioLogueado');
  const tematicaInfo = tematicaSeleccionada ? tematicaConfig[tematicaSeleccionada] : null;
  const fondo = tematicaSeleccionada ? fondoPorTematica[tematicaSeleccionada] : null;
  const logo = tematicaSeleccionada ? tematicaLogo[tematicaSeleccionada] : null;

  useEffect(() => {
    setRankingPartidas(null);
  }, []);

  const manejarSeleccion = async (tematica: string) => {
    setTematicaSeleccionada(tematica);
    setUltimaTematica(tematica);
    setMostrarModalTematica(true);
    setConfettiActivo(true);

    try {
      const res = await axios.get(`/api/Pregunta/tematica/${tematica}`);
      setPreguntas(res.data);
      setIndiceActual(0);
      setTiempoRestante(30);
      setMostrarTiempoFinalizado(false);

      const estado = await axios.get(`/api/Partida/estado/${partidaId}`);
      setEstadoPartida(estado.data);
    } catch (error) {
      console.error('Error cargando preguntas:', error);
    }

    setTimeout(() => {
      setMostrarModalTematica(false);
      setConfettiActivo(false);
    }, 3000);
  };

  const manejarRespuesta = async (acertada: boolean, tipo: string, esTiempoAgotado = false) => {
    if (yaRespondido.current) return;
    yaRespondido.current = true;

    try {
      await axios.put('/api/Partida/actualizar', {
        partidaId: parseInt(partidaId || '0'),
        respuestaCorrecta: acertada && !esTiempoAgotado,
        tipoPregunta: tipo
      });

      const estado = await axios.get(`/api/Partida/estado/${partidaId}`);
      setEstadoPartida(estado.data);

      if (acertada && !esTiempoAgotado) {
        setAnimacionPuntos(true);
        setTimeout(() => setAnimacionPuntos(false), 800);
      } else {
        setAnimacionVida(true);
        setTimeout(() => setAnimacionVida(false), 800);
      }

      setTimeout(() => {
        yaRespondido.current = false;
      }, 3000);

      if (estado.data.partidaFinalizada || estado.data.vidasRestantes <= 0) {
        try {
          const res = await axios.get(`/api/Partida/ranking/por-partida/${partidaId}`);
          setTimeout(() => setRankingPartidas(res.data), 4000);
        } catch (error) {
          console.error("Error cargando ranking:", error);
        }
      } else if (indiceActual + 1 >= preguntas.length) {
        setTimeout(() => {
          setTematicaSeleccionada(null);
          setPreguntas([]);
          setIndiceActual(0);
          setForzarCorrecta(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setIndiceActual((prev) => prev + 1);
          setTiempoRestante(30);
          setMostrarTiempoFinalizado(false);
          setForzarCorrecta(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error al actualizar la partida:', error);
    }
  };

  const usarSabio = () => {
    if (estadoPartida?.puntos >= 3000 && !sabioUsado && preguntas[indiceActual]) {
      setForzarCorrecta(true);
      setSabioUsado(true);
    }
  };

  useEffect(() => {
    if (!tematicaSeleccionada || indiceActual >= preguntas.length || preguntas.length === 0) return;

    setTiempoRestante(30);
    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setMostrarTiempoFinalizado(true);
          manejarRespuesta(false, preguntas[indiceActual].tipo, true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [indiceActual, tematicaSeleccionada, preguntas.length]);

  if (rankingPartidas) {
    return (
      <RankingPartidas
        ranking={rankingPartidas}
        onSalir={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 p-6">
      {fondo && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, ${fondo.from}, ${fondo.via}, ${fondo.to})`,
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const size = 30 + Math.random() * 20;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            return (
              <div
                key={i}
                className="absolute text-white text-opacity-20 font-bold"
                style={{ fontSize: `${size}px`, left: `${left}%`, top: `${top}%` }}
              >
                {fondo.figura}
              </div>
            );
          })}
        </div>
      )}

      <Confetti trigger={confettiActivo} />

      <div className="w-full z-50">
        {estadoPartida && (
          <HeaderJuego
            puntos={estadoPartida.puntos}
            vidas={estadoPartida.vidasRestantes}
            usuarioNombre={usuarioNombre}
            animacionPuntos={animacionPuntos}
            animacionVida={animacionVida}
          />
        )}
      </div>

      {estadoPartida && (
        <div className="hidden 2xl:block fixed top-1/2 right-4 -translate-y-1/2 z-40">
          <JugadoresActivos />
        </div>
      )}

      {!tematicaSeleccionada && (
        <>
          <motion.h1 className="text-5xl font-extrabold mb-10 text-center text-indigo-800 drop-shadow-md z-10" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            🎯 ¡Gira la ruleta y descubre tu temática!
          </motion.h1>
          <motion.div className="z-10" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <RuletaTematicas onSelect={manejarSeleccion} ultimaTematica={ultimaTematica} />
          </motion.div>
        </>
      )}

      <ModalTematica visible={mostrarModalTematica} tematica={tematicaSeleccionada} />

      <AnimatePresence>
        {tematicaSeleccionada && preguntas.length > 0 && indiceActual < preguntas.length && (
          <motion.div className="flex items-center justify-center z-30 w-full overflow-y-auto px-4 pt-40 pb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col items-center w-full max-w-5xl space-y-6">
              {tematicaInfo && (
                <div className="flex items-center justify-center gap-4">
                  <img src={logo?.logo} alt={`Logo de ${tematicaSeleccionada}`} className="w-24 sm:w-28" />
                  <img src={tematicaInfo.personaje} alt={`Personaje de ${tematicaSeleccionada}`} className="w-24 sm:w-28" />
                </div>
              )}
              <PreguntaCard
                pregunta={preguntas[indiceActual]}
                onRespuesta={manejarRespuesta}
                tiempoRestante={tiempoRestante}
                mensajeTiempo={mostrarTiempoFinalizado}
                forzarCorrecta={forzarCorrecta}
              />
              <div className="absolute bottom-4 left-4 z-40">
                <div className="relative">
                  <img
                    src={sabioUsado ? "/personajes/sabio2.png" : "/personajes/sabio.png"}
                    className="w-24 sm:w-28 md:w-36 lg:w-48 xl:w-56 2xl:w-64 cursor-pointer transition-transform hover:scale-105"
                    onClick={usarSabio}
                    alt="Sabio"
                  />
                  {!sabioUsado && estadoPartida?.puntos < 3000 && (
                    <img
                      src="/personajes/candado.png"
                      alt="Candado 3000 pts"
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 lg:w-14"
                    />
                  )}
                </div>
              </div>
              <div className="block 2xl:hidden mt-8 w-full flex justify-center z-30">
                <JugadoresActivos />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Juego;