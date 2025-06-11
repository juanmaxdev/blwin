import type React from "react"
interface InformacionCartasProps {
  titulo: string
  icono: string
  children: React.ReactNode
}

export function InformacionCarta({ titulo, icono, children }: InformacionCartasProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-bold mb-3">
        {icono} {titulo}:
      </h4>
      {children}
    </div>
  )
}