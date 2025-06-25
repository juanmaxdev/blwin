'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UsuarioMamonMemoria from './memoria/Usuario_mamon_memoria';

interface UsuarioMamonProps {
  onPruebaCompletada?: (puntos: number) => void;
  onPruebaFallada?: () => void;
  onInicioMinijuego?: () => void;
  onFinMinijuego?: () => void;
}

type TipoPrueba = 'memoria' | 'logica' | 'velocidad' | null;

export default function UsuarioMamon({
  onPruebaCompletada,
  onPruebaFallada,
  onInicioMinijuego,
  onFinMinijuego,
}: UsuarioMamonProps) {
  const [pruebaActual, setPruebaActual] = useState<TipoPrueba>(null);
  const [mostrarDialogo, setMostrarDialogo] = useState(true);
  const [fraseActual, setFraseActual] = useState(0);

  const frasesIntroduccion = [
    '¡Ja! ¿Así que crees que puedes vencerme con preguntas normales?',
    '¡Pues te equivocas! Yo tengo pruebas especiales que pondrán a prueba tu verdadero talento.',
    '¡Veamos si realmente tienes lo que se necesita para ser un desarrollador completo!',
  ];

  useEffect(() => {
    if (mostrarDialogo && fraseActual < frasesIntroduccion.length - 1) {
      const timer = setTimeout(() => {
        setFraseActual((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (mostrarDialogo && fraseActual === frasesIntroduccion.length - 1) {
      const timer = setTimeout(() => {
        setMostrarDialogo(false);
        seleccionarPruebaAleatoria();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mostrarDialogo, fraseActual]);

  const seleccionarPruebaAleatoria = () => {
    const pruebas: TipoPrueba[] = ['memoria'];
    const pruebaSeleccionada = pruebas[Math.floor(Math.random() * pruebas.length)];
    setPruebaActual(pruebaSeleccionada);
    // Notificar que inicia el minijuego (desactivar comodines)
    if (onInicioMinijuego) {
      onInicioMinijuego();
    }
  };

  const manejarPruebaCompletada = (puntos: number) => {
    setPruebaActual(null);
    // Notificar que inicia el minijuego (desactivar comodines)
    if (onInicioMinijuego) {
      onInicioMinijuego();
    }
    if (onPruebaCompletada) {
      onPruebaCompletada(puntos);
    }
  };

  const manejarPruebaFallada = () => {
    setPruebaActual(null);
    if (onFinMinijuego) {
      onFinMinijuego();
    }
    if (onPruebaFallada) {
      onPruebaFallada();
    }
  };

  return (
    <div className="absolute inset-0">
      {/* Diálogo de introducción */}
      {mostrarDialogo && (
        <motion.div
          className="absolute top-16 sm:top-20 md:top-32 right-40 sm:right-60 md:right-80 bg-white bg-opacity-90 rounded-2xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-md z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absabsolute -right-2 sm:-right-4 top-4 sm:top-8 w-0 h-0 border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-l-4 sm:border-l-8 border-transparent border-l-white"></div>

          <p className="text-sm sm:text-lg font-medium text-gray-800 mb-2 sm:mb-4">{frasesIntroduccion[fraseActual]}</p>

          <div className="flex justify-center">
            <div className="flex space-x-1 sm:space-x-2">
              {frasesIntroduccion.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    index === fraseActual ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pruebas específicas */}
      {pruebaActual === 'memoria' && (
        <UsuarioMamonMemoria onJuegoCompletado={manejarPruebaCompletada} onJuegoFallado={manejarPruebaFallada}/>
      )}

      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-red-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
