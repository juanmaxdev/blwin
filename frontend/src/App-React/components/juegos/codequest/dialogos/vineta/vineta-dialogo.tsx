"use client"

import { useEffect, useState } from "react"

interface VinetaDialogoProps {
  texto: string
  posicion: "izquierda" | "derecha"
  className?: string
  duracion?: number
  onDesaparecer?: () => void
}

export default function VinetaDialogo({
  texto,
  posicion,
  className = "",
  duracion = 5000,
  onDesaparecer,
}: VinetaDialogoProps) {
  const [visible, setVisible] = useState(false)
  const [saliendo, setSaliendo] = useState(false)

  useEffect(() => {
    // Animación de entrada
    const timer1 = setTimeout(() => {
      setVisible(true)
    }, 100)

    // Animación de salida
    const timer2 = setTimeout(() => {
      setSaliendo(true)
    }, duracion - 500)

    // Desaparición completa
    const timer3 = setTimeout(() => {
      onDesaparecer?.()
    }, duracion)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [duracion, onDesaparecer])

  return (
    <div
      className={`relative max-w-md transition-all duration-500 transform ${
        visible && !saliendo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
      } ${className}`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-300">
        <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">{texto}</p>

        {/* Punta de la viñeta */}
        <div
          className={`absolute w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent
            ${
              posicion === "izquierda"
                ? "-bottom-8 left-10 transform rotate-180"
                : "-bottom-8 right-10 transform rotate-180"
            }`}
        />
      </div>
    </div>
  )
}
