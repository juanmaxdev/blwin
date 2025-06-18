'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Imagenes daily para escenario

import EscenarioDaily1 from '../../../../../assets/juegos/codequest/imagenes/daily_reunion.png';
import EscenarioDaily2 from '../../../../../assets/juegos/codequest/imagenes/daily_reunion_1.png';
import EscenarioDaily3 from '../../../../../assets/juegos/codequest/imagenes/daily_reunion_2.png';
import EscenarioDaily4 from '../../../../../assets/juegos/codequest/imagenes/daily_reunion_3.png';

interface EscenarioScrumProps {
  fallosConsecutivos: number;
  preguntaActual: number;
}

export default function EscenarioScrum({ fallosConsecutivos, preguntaActual }: EscenarioScrumProps) {
  const [imagenActual, setImagenActual] = useState(0);

  const imagenesDaily = [EscenarioDaily1, EscenarioDaily2, EscenarioDaily3, EscenarioDaily4];

  const textosEstado = [
    'El equipo está concentrado y colaborativo. ¡Buen ambiente de trabajo!',
    'Hay algo de tensión en el aire. El Scrum Master parece preocupado...',
    '¡La reunión se está volviendo caótica! Algunos miembros del equipo están frustrados.',
    '¡Completo desastre! El equipo está en pánico y el proyecto en peligro.',
  ];

  // Cambiar imagen según fallos consecutivos
  useEffect(() => {
    if (fallosConsecutivos >= 3) {
      setImagenActual(3);
    } else if (fallosConsecutivos >= 2) {
      setImagenActual(2);
    } else if (fallosConsecutivos >= 1) {
      setImagenActual(1);
    } else {
      setImagenActual(0);
    }
  }, [fallosConsecutivos]);

  return (
    <motion.div
      className="bg-white bg-opacity-85 rounded-2xl shadow-2xl p-4 w-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      key={`${preguntaActual}-${fallosConsecutivos}`} // Re-animar cuando cambie la pregunta o fallos
    >
      {/* Título de la reunión */}
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-blue-800 mb-1">📅 Daily Scrum</h3>
        <div className="flex justify-center items-center gap-2 text-xs text-gray-600">
          <span>Sprint 3 - Día {Math.floor(preguntaActual / 3) + 1}</span>
          <span className="mx-1">•</span>
          <span className={`font-bold ${fallosConsecutivos > 0 ? "text-red-600" : "text-green-600"}`}>
            Fallos: {fallosConsecutivos}
          </span>
        </div>
      </div>

      {/* Imagen de la reunión */}
      <motion.div
        className="relative mb-3"
        animate={{
          scale: fallosConsecutivos > 0 ? [1, 1.02, 1] : 1,
          rotate: fallosConsecutivos >= 3 ? [-1, 1, -1, 0] : 0,
        }}
        transition={{
          duration: fallosConsecutivos >= 3 ? 0.5 : 2,
          repeat: fallosConsecutivos >= 3 ? 3 : 0,
        }}
      >
        <img
          src={imagenesDaily[imagenActual] || "/placeholder.svg"}
          alt="Daily Meeting"
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />

        {/* Overlay con efectos según el estado */}
        {fallosConsecutivos > 0 && (
          <div
            className={`absolute inset-0 rounded-xl ${
              fallosConsecutivos >= 3
                ? "bg-red-500 bg-opacity-20"
                : fallosConsecutivos >= 2
                  ? "bg-orange-500 bg-opacity-15"
                  : "bg-yellow-500 bg-opacity-10"
            }`}
          />
        )}

        {/* Indicadores de estado */}
        <div className="absolute top-2 right-2 flex gap-1">
          {Array.from({ length: Math.min(fallosConsecutivos, 3) }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </div>
      </motion.div>

      {/* Estado del equipo */}
      <div
        className={`text-center p-2 rounded-lg text-sm ${
          fallosConsecutivos >= 3
            ? "bg-red-100 text-red-800"
            : fallosConsecutivos >= 2
              ? "bg-orange-100 text-orange-800"
              : fallosConsecutivos >= 1
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
        }`}
      >
        <p className="font-medium">{textosEstado[imagenActual]}</p>
      </div>

      {/* Métricas del sprint */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-blue-50 p-2 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{Math.max(0, 10 - fallosConsecutivos * 2)}</div>
          <div className="text-xs text-blue-800">Moral</div>
        </div>
        <div className="bg-purple-50 p-2 rounded-lg">
          <div className="text-lg font-bold text-purple-600">{Math.max(0, 8 - fallosConsecutivos)}</div>
          <div className="text-xs text-purple-800">Velocity</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="text-lg font-bold text-green-600">{Math.max(0, 100 - fallosConsecutivos * 15)}%</div>
          <div className="text-xs text-green-800">Progress</div>
        </div>
      </div>

      {/* Mensaje motivacional o de alerta */}
      {fallosConsecutivos === 0 ? (
        <motion.div
          className="mt-3 text-center text-green-600 font-medium text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          ¡Excelente trabajo! 🚀
        </motion.div>
      ) : fallosConsecutivos >= 3 ? (
        <motion.div
          className="mt-3 text-center text-red-600 font-bold text-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          ¡CRISIS EN EL SPRINT! 🚨
        </motion.div>
      ) : (
        <div className="mt-3 text-center text-orange-600 font-medium text-sm">⚠️ El equipo necesita apoyo</div>
      )}
    </motion.div>
  )
}