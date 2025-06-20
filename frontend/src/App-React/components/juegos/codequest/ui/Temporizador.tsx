"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TemporizadorProps {
  duracion: number // Duración en segundos
  onTiempoAgotado: () => void
  activo: boolean
  onReset?: () => void
  className?: string
}

export default function Temporizador({
  duracion,
  onTiempoAgotado,
  activo,
  onReset,
  className = "",
}: TemporizadorProps) {
  const [tiempoRestante, setTiempoRestante] = useState(duracion)
  const [progreso, setProgreso] = useState(100)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reiniciar temporizador cuando cambie la duración o se active
  useEffect(() => {
    setTiempoRestante(duracion)
    setProgreso(100)
  }, [duracion, onReset])

  // Manejar el conteo regresivo
  useEffect(() => {
    if (!activo) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTiempoRestante((prev) => {
        const nuevo = prev - 1
        const nuevoProgreso = (nuevo / duracion) * 100

        setProgreso(nuevoProgreso)

        if (nuevo <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          onTiempoAgotado()
          return 0
        }

        return nuevo
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [activo, duracion, onTiempoAgotado])

  // Limpiar interval al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Determinar color según el tiempo restante
  const getColor = () => {
    if (progreso > 60) return "text-green-600"
    if (progreso > 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getBarColor = () => {
    if (progreso > 60) return "bg-green-500"
    if (progreso > 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Formatear tiempo en MM:SS
  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${minutos.toString().padStart(2, "0")}:${segs.toString().padStart(2, "0")}`
  }

 return (
    <div className={`bg-white bg-opacity-90 rounded-xl shadow-lg p-2 sm:p-3 md:p-4 ${className}`}>
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Tiempo restante</span>
        <motion.span
          className={`text-base sm:text-lg md:text-xl font-bold ${getColor()}`}
          animate={tiempoRestante <= 10 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: tiempoRestante <= 10 ? Number.POSITIVE_INFINITY : 0 }}
        >
          {formatearTiempo(tiempoRestante)}
        </motion.span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
        <motion.div
          className={`h-full ${getBarColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${Math.max(0, progreso)}%` }}
          animate={tiempoRestante <= 10 ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 0.5, repeat: tiempoRestante <= 10 ? Number.POSITIVE_INFINITY : 0 }}
        />
      </div>

      {/* Indicador de urgencia */}
      {tiempoRestante <= 10 && (
        <motion.div
          className="mt-1 sm:mt-2 text-center text-xs font-medium text-red-600"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          ¡Te quedas sin tiempo campeón!
        </motion.div>
      )}
    </div>
  )
}

// Hook personalizado para manejar diferentes dificultades
export const useTiempoPorDificultad = (dificultad: "facil" | "media" | "dificil" | null) => {
  const tiempos = {
    facil: 45, 
    media: 35, 
    dificil: 25,
  }

  return dificultad ? tiempos[dificultad] : 30 // 
}
