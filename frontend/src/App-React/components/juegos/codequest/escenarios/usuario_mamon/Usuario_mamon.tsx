"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import UsuarioMamonMemoria from "./memoria/Usuario_mamon_memoria"

interface UsuarioMamonProps {
  onPruebaCompletada?: (puntos: number) => void
  onPruebaFallada?: () => void

}

type TipoPrueba = "memoria" | "logica" | "velocidad" | null

export default function UsuarioMamon({ onPruebaCompletada, onPruebaFallada }: UsuarioMamonProps) {
  const [pruebaActual, setPruebaActual] = useState<TipoPrueba>(null)
  const [mostrarDialogo, setMostrarDialogo] = useState(true)
  const [fraseActual, setFraseActual] = useState(0)

  const frasesIntroduccion = [
    "¡Ja! ¿Así que crees que puedes vencerme con preguntas normales?",
    "¡Pues te equivocas! Yo tengo pruebas especiales que pondrán a prueba tu verdadero talento.",
    "¡Veamos si realmente tienes lo que se necesita para ser un desarrollador completo!",
  ]

  useEffect(() => {
    if (mostrarDialogo && fraseActual < frasesIntroduccion.length - 1) {
      const timer = setTimeout(() => {
        setFraseActual((prev) => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (mostrarDialogo && fraseActual === frasesIntroduccion.length - 1) {
      const timer = setTimeout(() => {
        setMostrarDialogo(false)
        seleccionarPruebaAleatoria()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [mostrarDialogo, fraseActual])

  const seleccionarPruebaAleatoria = () => {
    const pruebas: TipoPrueba[] = ["memoria"] 
    const pruebaSeleccionada = pruebas[Math.floor(Math.random() * pruebas.length)]
    setPruebaActual(pruebaSeleccionada)
  }

  const manejarPruebaCompletada = (puntos: number) => {
    setPruebaActual(null)
    if (onPruebaCompletada) {
      onPruebaCompletada(puntos)
    }
  }

  const manejarPruebaFallada = () => {
    setPruebaActual(null)
    if (onPruebaFallada) {
      onPruebaFallada()
    }
  }

  return (
    <div className="absolute inset-0">

      {/* Diálogo de introducción */}
      {mostrarDialogo && (
        <motion.div
          className="absolute top-32 right-80 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 max-w-md z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -right-4 top-8 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>

          <p className="text-lg font-medium text-gray-800 mb-4">{frasesIntroduccion[fraseActual]}</p>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              {frasesIntroduccion.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === fraseActual ? "bg-purple-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pruebas específicas */}
      {pruebaActual === "memoria" && (
        <UsuarioMamonMemoria onJuegoCompletado={manejarPruebaCompletada} onJuegoFallado={manejarPruebaFallada} />
      )}

      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-red-500 rounded-full opacity-30"
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
  )
}
