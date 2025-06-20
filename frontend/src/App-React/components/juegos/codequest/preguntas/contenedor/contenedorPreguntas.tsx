'use client';

import { useState, useEffect } from 'react';
import Temporizador, { useTiempoPorDificultad } from '../../ui/Temporizador';

interface ContenedorPreguntasProps {
  pregunta: string;
  codigo?: string;
  opcionesRespuesta: Record<string, string>;
  respuestaCorrecta: string;
  onSeleccionarRespuesta: (opcion: string) => void;
  opcionesOcultas?: string[];
  respuestaSeleccionada?: string | null;
  dificultad?: 'facil' | 'media' | 'dificil' | null;
  onTiempoAgotado?: () => void;
}

export default function ContenedorPreguntas({
  pregunta,
  codigo,
  opcionesRespuesta,
  respuestaCorrecta,
  onSeleccionarRespuesta,
  opcionesOcultas = [],
  respuestaSeleccionada = null,
  dificultad = null,
  onTiempoAgotado,
}: ContenedorPreguntasProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [temporizadorKey, setTemporizadorKey] = useState(0);

  // Obtener tiempo según dificultad
  const tiempoPorDificultad = useTiempoPorDificultad(dificultad);

  // Reiniciar temporizador cuando cambie la pregunta
  useEffect(() => {
    setTemporizadorKey((prev) => prev + 1);
  }, [pregunta]);

  const getOptionStyle = (key: string) => {
    const isSelected = respuestaSeleccionada === key;
    const isHovered = hoveredOption === key;
    const isHidden = opcionesOcultas.includes(key);
    const isCorrect = key === respuestaCorrecta && respuestaSeleccionada !== null;

    if (isHidden) {
      return 'opacity-30 cursor-not-allowed bg-gray-100';
    }

    if (respuestaSeleccionada !== null) {
      // Mostrar resultado después de seleccionar
      if (isSelected && isCorrect) {
        return 'bg-green-100 border-green-500 cursor-default';
      } else if (isSelected && !isCorrect) {
        return 'bg-red-100 border-red-500 cursor-default';
      } else if (isCorrect) {
        return 'bg-green-50 border-green-400 cursor-default';
      } else {
        return 'bg-gray-50 border-gray-300 cursor-default';
      }
    }

    // Estado normal (antes de seleccionar)
    if (isSelected) {
      return 'bg-blue-100 border-blue-500 transform scale-105';
    } else if (isHovered) {
      return 'bg-blue-50 border-blue-300 transform scale-102 cursor-pointer';
    } else {
      return 'bg-white border-gray-300 hover:border-blue-200 cursor-pointer';
    }
  };

  const getCircleStyle = (key: string) => {
    const isSelected = respuestaSeleccionada === key;
    const isCorrect = key === respuestaCorrecta && respuestaSeleccionada !== null;
    const isHidden = opcionesOcultas.includes(key);

    if (isHidden) {
      return 'border-gray-300 bg-gray-100';
    }

    if (respuestaSeleccionada !== null) {
      if (isSelected && isCorrect) {
        return 'border-green-500 bg-green-500 text-white';
      } else if (isSelected && !isCorrect) {
        return 'border-red-500 bg-red-500 text-white';
      } else if (isCorrect) {
        return 'border-green-500 bg-green-100 text-green-700';
      } else {
        return 'border-gray-400 bg-gray-100';
      }
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-500 text-white';
    } else {
      return 'border-gray-400 bg-white';
    }
  };

  const handleOptionClick = (key: string) => {
    if (opcionesOcultas.includes(key) || respuestaSeleccionada !== null) return;
    onSeleccionarRespuesta(key);
  };

  const handleTiempoAgotado = () => {
    if (respuestaSeleccionada === null && onTiempoAgotado) {
      onTiempoAgotado();
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
      {/* Temporizador */}
      {dificultad && (
        <div className="mb-2 sm:mb-4 flex justify-center">
          <Temporizador
            key={temporizadorKey}
            duracion={tiempoPorDificultad}
            onTiempoAgotado={handleTiempoAgotado}
            activo={respuestaSeleccionada === null}
            className="w-48 sm:w-56 md:w-64"
          />
        </div>
      )}

      <div className="relative bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6">
        <div className="absolute -bottom-2 sm:-bottom-4 left-4 sm:left-6 md:left-10 w-0 h-0 border-t-4 sm:border-t-8 border-t-white border-x-4 sm:border-x-8 border-x-transparent" />

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-800">{pregunta}</h2>

        {codigo && (
          <pre className="bg-gray-100 rounded-md p-2 sm:p-3 md:p-4 overflow-x-auto mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm">
            <code>{codigo}</code>
          </pre>
        )}

        <ul className="space-y-2 sm:space-y-3">
          {Object.entries(opcionesRespuesta).map(([key, label]) => (
            <li
              key={key}
              className={`flex items-center p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
                key
              )}`}
              onClick={() => handleOptionClick(key)}
              onMouseEnter={() => setHoveredOption(key)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full mr-2 sm:mr-3 md:mr-4 border-2 font-bold transition-all duration-200 text-xs sm:text-sm md:text-base ${getCircleStyle(
                  key
                )}`}
              >
                {key.toUpperCase()}
              </span>
              <span
                className={`text-gray-700 font-medium text-xs sm:text-sm md:text-base ${
                  opcionesOcultas.includes(key) ? 'line-through' : ''
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>

        {respuestaSeleccionada !== null && (
          <div className="mt-2 sm:mt-3 md:mt-4 p-2 sm:p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs sm:text-sm text-blue-800">
              {respuestaSeleccionada === respuestaCorrecta
                ? '¡Correcto! Has seleccionado la respuesta correcta.'
                : `Incorrecto. La respuesta correcta era: ${respuestaCorrecta.toUpperCase()} - ${
                    opcionesRespuesta[respuestaCorrecta]
                  }`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
