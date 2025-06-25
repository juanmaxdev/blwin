import { Progreso } from "../ui/Progreso"

interface BarraProgesoProps {
  preguntaActual: number
  preguntasTotales: number
  progreso: number
  puntuacion: number
}

export default function BarraProgeso({ preguntaActual, preguntasTotales, progreso, puntuacion }: BarraProgesoProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <div className="text-sm text-gray-600">
          Pregunta {preguntaActual + 1} de {preguntasTotales}
        </div>
        <Progreso value={progreso} className="w-48" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">{puntuacion}</div>
        <div className="text-sm text-gray-600">puntos</div>
      </div>
    </div>
  )
}