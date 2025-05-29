import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Pregunta = {
  enunciado: string;
  tipo: string;
  respuestaCorrecta: string;
  respuestasPregunta: string[];
};

interface Props {
  pregunta: Pregunta;
  onRespuesta: (acertada: boolean, tipo: string, esTiempoAgotado?: boolean) => void;
  tiempoRestante: number;
  mensajeTiempo: boolean;
  forzarCorrecta?: boolean; // <- NUEVA PROP
}

const colores = [
  { bg: "bg-red-500", icono: "🟥" },
  { bg: "bg-blue-500", icono: "🔼" },
  { bg: "bg-yellow-400", icono: "📀" },
  { bg: "bg-green-500", icono: "🟢" }
];

const PreguntaCard: React.FC<Props> = ({
  pregunta,
  onRespuesta,
  tiempoRestante,
  mensajeTiempo,
  forzarCorrecta = false
}) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [opcionesMezcladas, setOpcionesMezcladas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<"correcto" | "incorrecto" | "tiempo" | null>(null);
  const [sonidoCuentaAtrasReproducido, setSonidoCuentaAtrasReproducido] = useState(false);

  // 🔊 Referencias a sonidos
  const sonidoAcierto = useRef<HTMLAudioElement | null>(null);
  const sonidoFallo = useRef<HTMLAudioElement | null>(null);
  const sonidoCuentaAtras = useRef<HTMLAudioElement | null>(null);
  const sonidoTiempo = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const todas = [...pregunta.respuestasPregunta, pregunta.respuestaCorrecta];
    const mezcladas = todas.sort(() => Math.random() - 0.5);
    setOpcionesMezcladas(mezcladas);
    setRespuestaSeleccionada(null);
    setResultado(null);
    setSonidoCuentaAtrasReproducido(false);
  }, [pregunta]);

  useEffect(() => {
    if (mensajeTiempo && !respuestaSeleccionada) {
      setResultado("tiempo");

      // ❌ Detener cuenta atrás
      sonidoCuentaAtras.current?.pause();
      sonidoCuentaAtras.current!.currentTime = 0;

      // ⏳ Esperar 200 ms antes de reproducir el sonido de tiempo agotado
      setTimeout(() => {
        sonidoTiempo.current?.play();
      }, 200);

      onRespuesta(false, pregunta.tipo, true);
    }
  }, [mensajeTiempo]);

  // 🎵 Reproducir cuenta atrás si quedan ≤10s y aún no ha sonado
  useEffect(() => {
    if (
      tiempoRestante <= 10 &&
      tiempoRestante > 0 &&
      !sonidoCuentaAtrasReproducido &&
      resultado === null
    ) {
      sonidoCuentaAtras.current?.play();
      setSonidoCuentaAtrasReproducido(true);
    }
  }, [tiempoRestante, sonidoCuentaAtrasReproducido, resultado]);

  // ✅ NUEVO EFECTO PARA FORZAR LA CORRECTA
  useEffect(() => {
    if (forzarCorrecta && !respuestaSeleccionada) {
      setRespuestaSeleccionada(pregunta.respuestaCorrecta);
      setResultado("correcto");
      onRespuesta(true, pregunta.tipo);
    }
  }, [forzarCorrecta]);

  const manejarRespuesta = (respuesta: string) => {
    if (respuestaSeleccionada !== null) return;

    const esCorrecta = respuesta === pregunta.respuestaCorrecta;
    setRespuestaSeleccionada(respuesta);
    setResultado(esCorrecta ? "correcto" : "incorrecto");

    if (esCorrecta) {
      sonidoAcierto.current?.play();
    } else {
      sonidoFallo.current?.play();
    }

    onRespuesta(esCorrecta, pregunta.tipo);
  };

  const colorTemporizador =
    tiempoRestante > 20 ? "text-green-400"
    : tiempoRestante > 10 ? "text-yellow-400"
    : "text-red-500";

  const getColor = (index: number, respuesta: string) => {
    const base = colores[index % colores.length];
    if (!respuestaSeleccionada) return base.bg + " hover:scale-105";

    if (respuesta === respuestaSeleccionada && respuesta === pregunta.respuestaCorrecta)
      return "bg-green-500 text-white";
    if (respuesta === respuestaSeleccionada && respuesta !== pregunta.respuestaCorrecta)
      return "bg-red-500 text-white";
    if (respuesta === pregunta.respuestaCorrecta)
      return "bg-green-300 text-white";

    return "bg-gray-300";
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="w-full max-w-5xl p-6 bg-white/90 rounded-3xl shadow-2xl space-y-6 text-center border-4 border-indigo-100"
    >
      {/* 🔊 Audios */}
      <audio ref={sonidoAcierto} src="/sonidos/acierto.mp3" preload="auto" />
      <audio ref={sonidoFallo} src="/sonidos/fallo.mp3" preload="auto" />
      <audio ref={sonidoCuentaAtras} src="/sonidos/cuenta-atras.mp3" preload="auto" />
      <audio ref={sonidoTiempo} src="/sonidos/tiempo.mp3" preload="auto" />

      <div className="flex items-center justify-between text-xl font-bold">
        <h3 className="text-indigo-800 text-2xl">{pregunta.enunciado}</h3>
        <span className={`text-2xl font-extrabold ${colorTemporizador}`}>
          ⏱ {tiempoRestante}s
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {opcionesMezcladas.map((respuesta, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            key={i}
            onClick={() => manejarRespuesta(respuesta)}
            disabled={!!respuestaSeleccionada}
            className={`transition duration-300 ease-in-out text-white text-lg font-semibold px-6 py-5 rounded-xl shadow-md flex items-center justify-start gap-4 ${getColor(i, respuesta)}`}
          >
            <span className="text-2xl">{colores[i % colores.length].icono}</span> {respuesta}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-xl font-bold mt-4 ${
              resultado === "correcto"
                ? "text-green-600"
                : resultado === "incorrecto"
                ? "text-red-600"
                : "text-orange-500"
            }`}
          >
            {resultado === "tiempo"
              ? "⏰ ¡Se acabó el tiempo!"
              : resultado === "correcto"
              ? "✅ ¡Respuesta correcta!"
              : `❌ Incorrecto. La correcta era: ${pregunta.respuestaCorrecta}`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PreguntaCard;
