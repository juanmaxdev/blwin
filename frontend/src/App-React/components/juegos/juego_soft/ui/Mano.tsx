import { Carta } from "./Carta"
import type { Carta as CartaTipo} from "../types/Juego"

interface ManoProps {
    cartas: CartaTipo[]
    titulo: string
    puntuacion: number
    ocultarPrimeraCarta?: boolean
}

export function Mano({ cartas, titulo, puntuacion, ocultarPrimeraCarta = false }: ManoProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-bold text-white">{titulo}</h3>
      <div className="flex space-x-2">
        {cartas.map((carta, index) => (
          <Carta key={`${carta.color}-${carta.valor}-${index}`} carta={carta} cartaOculta={ocultarPrimeraCarta && index === 0} />
        ))}
      </div>
      <div className="text-lg font-semibold text-white">Puntuación: {ocultarPrimeraCarta ? "?" : puntuacion}</div>
    </div>
  )
}