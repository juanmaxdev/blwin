import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface RankingEntry {
  posicion: number;
  nombreUsuario: string;
  puntos: number;
  esUsuarioActual: boolean;
  usuarioId: number;
}

interface RankingPartidasProps {
  ranking: RankingEntry[];
  onSalir: () => void;
}

const RankingPartidas: React.FC<RankingPartidasProps> = ({ ranking, onSalir }) => {
  const jugadorActual = ranking.find((r) => r.esUsuarioActual);
  const top10 = ranking.filter((r) => r.posicion > 0 && r.posicion <= 10);
  const puntosSuspensivos = ranking.find((r) => r.posicion === -1);
  const fueraDelTop = jugadorActual && jugadorActual.posicion > 10;

  // 🔊 Sonidos según posición
  const sonidoPrimero = useRef<HTMLAudioElement | null>(null);
  const sonidoSegundo = useRef<HTMLAudioElement | null>(null);
  const sonidoTercero = useRef<HTMLAudioElement | null>(null);
  const sonidoOtros = useRef<HTMLAudioElement | null>(null);

  // 🎇 Confeti + sonido
  useEffect(() => {
    if (!jugadorActual) return;

    if (jugadorActual.posicion <= 10) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#00FF00", "#00BFFF"],
      });
    }

    const pos = jugadorActual.posicion;

    if (pos >= 1 && pos <= 3) {
      sonidoPrimero.current?.play();
    } else if (pos >= 4 && pos <= 6) {
      sonidoSegundo.current?.play();
    } else if (pos >= 7 && pos <= 10) {
      sonidoTercero.current?.play();
    } else {
      sonidoOtros.current?.play();
    }
  }, [jugadorActual]);

  const handleNuevaPartida = async () => {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
      alert("Error: Usuario no identificado");
      return;
    }

    try {
      const res = await fetch("/api/Partida/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId: parseInt(usuarioId) }),
      });

      const data = await res.json();
      localStorage.setItem("partidaId", data.partidaId);
      window.location.href = "/juego";
    } catch (error) {
      console.error("Error al crear nueva partida:", error);
      alert("No se pudo iniciar una nueva partida.");
    }
  };

  const renderMensajeMotivador = () => {
    if (!jugadorActual) return null;

    const pos = jugadorActual.posicion;

    if (pos >= 11) {
      return (
        <motion.p
          className="text-center text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ¡Sigue así, estás mejorando!
        </motion.p>
      );
    }

    if (pos >= 5 && pos <= 10) {
      return (
        <motion.p
          className="text-center text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ¡Vamos! Ya rozas el podio 💪🏽
        </motion.p>
      );
    }

    if (pos >= 2 && pos <= 4) {
      return (
        <motion.p
          className="text-center text-2xl text-amber-600 animate-bounce"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          ¿No eres capaz de llegar al trono? 👀 😂
        </motion.p>
      );
    }

    if (pos === 1) {
      return (
        <motion.p
          className="text-center text-4xl text-amber-500 uppercase font-medium animate-bounce"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          ¡Eres el rey de la partida! 🏰👏🏻
        </motion.p>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6">

        {/* 🔊 Audios por posición */}
        <audio ref={sonidoPrimero} src="/sonidos/primero.mp3" preload="auto" />
        <audio ref={sonidoSegundo} src="/sonidos/segundo.mp3" preload="auto" />
        <audio ref={sonidoTercero} src="/sonidos/tercero.mp3" preload="auto" />
        <audio ref={sonidoOtros} src="/sonidos/otros.mp3" preload="auto" />

        <h2 className="text-3xl font-extrabold text-center text-indigo-800">
          🎮 Partida finalizada
        </h2>

        {jugadorActual && (
          <>
            <p className="text-center text-lg font-semibold text-gray-700">
              Tu puntuación:{" "}
              <span className="text-indigo-700 font-bold">
                {jugadorActual.puntos} puntos
              </span>
            </p>

            {renderMensajeMotivador()}
          </>
        )}

        <h3 className="text-xl font-bold text-center text-gray-800 pt-4">
          🏆 Ranking
        </h3>

        <ul className="divide-y divide-gray-200">
          {top10.map((jugador) => (
            <li
              key={jugador.posicion}
              className={`py-2 flex justify-between items-center ${
                jugador.esUsuarioActual ? "font-bold text-indigo-600" : ""
              }`}
            >
              <span>
                {jugador.posicion}º - {jugador.nombreUsuario}{" "}
                {jugador.posicion === 1 && (
                  <span className="ml-2 text-yellow-500 text-xl">👑</span>
                )}
              </span>
              <span>{jugador.puntos} pts</span>
            </li>
          ))}

          {puntosSuspensivos && (
            <li className="py-2 text-center text-gray-400">...</li>
          )}

          {fueraDelTop && jugadorActual && (
            <li className="py-2 flex justify-between font-bold text-indigo-600">
              <span>
                {jugadorActual.posicion}º - {jugadorActual.nombreUsuario}
              </span>
              <span>{jugadorActual.puntos} pts</span>
            </li>
          )}
        </ul>

        <div className="flex flex-col gap-3 pt-6">
          <button
            onClick={handleNuevaPartida}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Nueva partida
          </button>
          <button
            onClick={onSalir}
            className="border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Salir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingPartidas;
