"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Tipos para las preguntas y puertas
interface PreguntaPuerta {
  id: number
  pregunta: string
  codigo?: string
  opcionesRespuesta: Record<string, string>
  respuestaCorrecta: string
  dificultad: "facil" | "media" | "dificil"
}

interface PuertaProps {
  onSeleccionPuerta: (dificultad: "facil" | "media" | "dificil", pregunta: PreguntaPuerta) => void
  preguntas: PreguntaPuerta[]
  imagenPuertaCerrada: string
  imagenPuertaAbierta: string
}

export default function Puertas({
  onSeleccionPuerta,
  preguntas,
  imagenPuertaCerrada,
  imagenPuertaAbierta,
}: PuertaProps) {
  // Estado para controlar qué puerta está seleccionada
  const [puertaSeleccionada, setPuertaSeleccionada] = useState<"facil" | "media" | "dificil" | null>(null)
  // Estado para las preguntas de cada puerta
  const [preguntasPuertas, setPreguntasPuertas] = useState<Record<string, PreguntaPuerta>>({
    facil: { id: 0, pregunta: "", opcionesRespuesta: {}, respuestaCorrecta: "", dificultad: "facil" },
    media: { id: 0, pregunta: "", opcionesRespuesta: {}, respuestaCorrecta: "", dificultad: "media" },
    dificil: { id: 0, pregunta: "", opcionesRespuesta: {}, respuestaCorrecta: "", dificultad: "dificil" },
  })

  // Efecto para asignar preguntas aleatorias a cada puerta según su dificultad
  useEffect(() => {
    const preguntasFaciles = preguntas.filter((p) => p.dificultad === "facil")
    const preguntasMedias = preguntas.filter((p) => p.dificultad === "media")
    const preguntasDificiles = preguntas.filter((p) => p.dificultad === "dificil")

    const seleccionarPreguntaAleatoria = (array: PreguntaPuerta[]) => {
      return array[Math.floor(Math.random() * array.length)]
    }

    setPreguntasPuertas({
      facil: seleccionarPreguntaAleatoria(preguntasFaciles.length ? preguntasFaciles : preguntas),
      media: seleccionarPreguntaAleatoria(preguntasMedias.length ? preguntasMedias : preguntas),
      dificil: seleccionarPreguntaAleatoria(preguntasDificiles.length ? preguntasDificiles : preguntas),
    })
  }, [preguntas])
 
  // Función para manejar la selección de una puerta
  const handleSeleccionPuerta = (dificultad: "facil" | "media" | "dificil") => {
    setPuertaSeleccionada(dificultad)

    // Después de un breve retraso, notificar al componente padre
    setTimeout(() => {
      onSeleccionPuerta(dificultad, preguntasPuertas[dificultad])
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="textoTales text-5xl font-bold text-violet-100 mb-8 text-center drop-shadow-lg">
        Elige una puerta para enfrentar tu desafío
      </h2>

      <div className="flex justify-center gap-8 mb-8">
        {/* Puerta Fácil */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => !puertaSeleccionada && handleSeleccionPuerta("facil")}
        >
          <img
            src={puertaSeleccionada === "facil" ? imagenPuertaAbierta : imagenPuertaCerrada}
            alt="Puerta Fácil"
            className="h-80 object-contain"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-lime-700 text-white px-4 py-1 rounded-full font-bold">Fácil</span>
          </div>
        </motion.div>

        {/* Puerta Media */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => !puertaSeleccionada && handleSeleccionPuerta("media")}
        >
          <img
            src={puertaSeleccionada === "media" ? imagenPuertaAbierta : imagenPuertaCerrada}
            alt="Puerta Media"
            className="h-80 object-contain"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-blue-400 text-white px-4 py-1 rounded-full font-bold">Media</span>
          </div>
        </motion.div>

        {/* Puerta Difícil */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => !puertaSeleccionada && handleSeleccionPuerta("dificil")}
        >
          <img
            src={puertaSeleccionada === "dificil" ? imagenPuertaAbierta : imagenPuertaCerrada}
            alt="Puerta Difícil"
            className="h-80 object-contain"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-purple-700 text-white px-4 py-1 rounded-full font-bold">Difícil</span>
          </div>
        </motion.div>
      </div>

      <div className="bg-white bg-opacity-80 p-6 rounded-xl max-w-2xl">
        <p className="text-lg text-center text-gray-800 font-bold">
          Detras de cada puerta esconde un desafío de programación. Según la dificultad así tendras la recompensa:
          <br /> <br />
          <span className="font-bold text-green-600">Fácil:</span> +20 puntos y -10 daño al jefe
          <br />
          <span className="font-bold text-blue-400">Media:</span> +35 puntos y -25 daño al jefe
          <br />
          <span className="font-bold text-purple-700">Difícil:</span> +50 puntos y -40 daño al jefe
        </p>
      </div>
    </div>
  )
}
